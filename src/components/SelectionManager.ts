// import { useCallback, useState } from "react"

// /**
//  * This is a simple selection manager that allows you to select one of many items.
//  * Each item is identified by a string id.
//  */
// type Selection = string | null // null means no selection
// type Subscriber = (value: Selection) => void // a function that is called when the selection changes
// type Unsubscribe = () => void // a function that unsubscribes the subscriber
// type Subscribe = (subscriber: Subscriber) => Unsubscribe // a function that subscribes a subscriber and returns an unsubscribe function

// // The selection manager is a singleton object that holds the current selection and a list of subscribers.
// type SelectionManager = {
//     value: Selection
//     subscribers: Subscriber[]
//     subscribe: Subscribe
// }
// const selection: SelectionManager = {
//     value: null,
//     subscribers: [],
//     subscribe(listener) {
//         this.subscribers.push(listener)
//         return () => {
//             this.subscribers = this.subscribers.filter(l => l != listener)
//         }
//     }
// }

// /** 
//  * This hook returns a tuple of two values:
//  * - isSelected: a boolean that is true if the item with the given id is selected
//  * - getSelection: a function that selects the item with the given id 
//  * @param id the id of the current item
//  * @returns a tuple of two values: isSelected and getSelection 
//  */
// export function useSelection(id: string) {
//     const [selectedId] = useState<Selection>(selection.value)
//     // TODO: subscribe to the selection manager and update the selectedId state when the selection changes
//     const getSelection = useCallback(() => {
//         // TODO: implement this function
//     }, [])

//     const isSelected = selectedId === id
//     return [isSelected, getSelection] as const
// }

// SelectionManager.tsx

import { useEffect, useCallback, useState } from "react";

type Selection = string | null;
type Subscriber = (value: Selection) => void;
type Unsubscribe = () => void;
type Subscribe = (subscriber: Subscriber) => Unsubscribe;

type SelectionManager = {
  value: Selection;
  subscribers: Subscriber[];
  subscribe: Subscribe;
};

const selection: SelectionManager = {
  value: null,
  subscribers: [],
  subscribe(listener) {
    this.subscribers.push(listener); // Update "this" to "selection" here
    return () => {
      this.subscribers = this.subscribers.filter((l) => l !== listener); // Update "this" to "selection" here
    };
  },
};

export function useSelection(): [Selection, (id: string) => void] {
  const [selectedId, setSelectedId] = useState<Selection>(selection.value);

  useEffect(() => {
    const unsubscribe = selection.subscribe((id) => setSelectedId(id));
    return () => unsubscribe();
  }, []);

  const selectField = useCallback((id: string) => {
    selection.value = id;
    selection.subscribers.forEach((subscriber) => subscriber(id));
  }, []);

  return [selectedId, selectField];
}
