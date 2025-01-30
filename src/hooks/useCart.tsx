// import { create } from 'zustand'
// import { persist, createJSONStorage } from 'zustand/middleware'

// interface CartItem {
//   id: string
//   name: string
//   price: number
//   quantity: number
//   image?: string
// }

// interface CartStore {
//   items: CartItem[]
//   addItem: (item: CartItem) => void
//   removeItem: (id: string) => void
//   updateQuantity: (id: string, quantity: number) => void
//   clearCart: () => void
//   itemCount: () => number
//   total: () => number
// }

// export const useCart = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       items: [],
//       addItem: (item) => 
//         set((state) => {
//           const existingItem = state.items.find((i) => i.id === item.id)
//           if (existingItem) {
//             return {
//               items: state.items.map((i) =>
//                 i.id === item.id
//                   ? { ...i, quantity: i.quantity + 1 }
//                   : i
//               ),
//             }
//           }
//           return { items: [...state.items, { ...item, quantity: 1 }] }
//         }),
//       removeItem: (id) =>
//         set((state) => ({
//           items: state.items.filter((i) => i.id !== id),
//         })),
//       updateQuantity: (id, quantity) =>
//         set((state) => ({
//           items: quantity === 0
//             ? state.items.filter((i) => i.id !== id)
//             : state.items.map((i) =>
//                 i.id === id ? { ...i, quantity } : i
//               ),
//         })),
//       clearCart: () => set({ items: [] }),
//       itemCount: () => {
//         try {
//           return get().items.reduce((sum, item) => sum + item.quantity, 0)
//         } catch (e) {
//           return 0
//         }
//       },
//       total: () => {
//         try {
//           return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
//         } catch (e) {
//           return 0
//         }
//       },
//     }),
//     {
//       name: 'cart-storage',
//       storage: createJSONStorage(() => localStorage),
//       onRehydrateStorage: () => (state) => {
//         console.log('hydration starts', state)
//       }
//     }
//   )
// )

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  itemCount: () => number
  total: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => 
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            }
          }
          return { items: [...state.items, { ...item, quantity: 1 }] }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: quantity === 0
            ? state.items.filter((i) => i.id !== id)
            : state.items.map((i) =>
                i.id === id ? { ...i, quantity } : i
              ),
        })),
      clearCart: () => set({ items: [] }),
      itemCount: () => {
        const items = get().items
        return items.reduce((sum, item) => sum + item.quantity, 0)
      },
      total: () => {
        const items = get().items
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage',
      skipHydration: true,
    }
  )
)