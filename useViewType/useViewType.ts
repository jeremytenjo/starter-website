import create from 'zustand'

type useViewTypeProps = {
  viewType: any
  setviewType: (props: any) => any
}

export const useViewTypeStore = create<useViewTypeProps>((set) => ({
  viewType: true,
  setviewType: (newValue) => set(() => ({ viewType: newValue })),
}))

export default function useViewType() {
  const viewTypeStore = useViewTypeStore()

  const updateviewType = (newValue) => {
    viewTypeStore.setviewType(newValue)
  }

  return {
    viewType: viewTypeStore.viewType,
    updateviewType,
  }
}
