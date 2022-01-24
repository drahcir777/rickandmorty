
export type ProductNavigationProps = {
    id?: string
}

export type OrderNavigationProps = {
    id: []
}

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            home: undefined;
            characterDetail: ProductNavigationProps
            favorites: OrderNavigationProps
        }
    }
}