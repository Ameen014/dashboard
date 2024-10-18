const Host = "https://maryapi.laimonah-scc.com/api"

export const api_Routes = {
    auth: {
        login: `${Host}/auth/admins`,
    },
    role: {
        view: `${Host}/roles`,
        add: `${Host}/roles`,
        bulkDelete: (id) => (`${Host}/roles/${id}`),
        getOne: (id) => (`${Host}/roles/${id}`),
        update: (id) => (`${Host}/roles/${id}`),
    },
    permission: {
        view: `${Host}/permissions`,
        add: `${Host}/permissions/assign`,
        bulkDelete: (id) => (`${Host}/permissions/${id}`),
        getOne: (id) => (`${Host}/permissions/${id}`),
        update: (id) => (`${Host}/permissions/${id}`),
    },
    admin: {
        view: `${Host}/admins`,
        add: `${Host}/admins`,
        bulkDelete: (id) => (`${Host}/admins/${id}`),
        getOne: (id) => (`${Host}/admins/${id}`),
        update: (id) => (`${Host}/admins/${id}`),
    },
    user: {
        view: `${Host}/users`,
        add: `${Host}/users`,
        bulkDelete: (id) => (`${Host}/users/${id}`),
        getOne: (id) => (`${Host}/users/${id}`),
        update: (id) => (`${Host}/users/${id}`),
    },
    products: {
        view: `${Host}/products`,
        add: `${Host}/products`,
        bulkDelete: (id) => (`${Host}/products/${id}`),
        getOne: (id) => (`${Host}/products/${id}`),
        update: (id) => (`${Host}/products/${id}`),
    },
    orders: {
        view: `${Host}/orders`,
        add: `${Host}/orders`,
        bulkDelete: (id) => (`${Host}/orders/${id}`),
        getOne: (id) => (`${Host}/orders/${id}`),
        update: (id) => (`${Host}/orders/${id}`),
    },
    category: {
        view: `${Host}/categories`,
        add: `${Host}/categories`,
        bulkDelete: (id) => (`${Host}/categories/${id}`),
        getOne: (id) => (`${Host}/categories/${id}`),
        update: (id) => (`${Host}/categories/${id}`),
    },
    reservation: {
        view: `${Host}/reservations`,
        add: `${Host}/reservations`,
        bulkDelete: (id) => (`${Host}/reservations/${id}`),
        getOne: (id) => (`${Host}/reservations/${id}`),
        update: (id) => (`${Host}/reservations/${id}`),
    },
    sizes: {
        view: `${Host}/sizes`,
        add: `${Host}/sizes`,
        bulkDelete: (id) => (`${Host}/sizes/${id}`),
        getOne: (id) => (`${Host}/sizes/${id}`),
        update: (id) => (`${Host}/sizes/${id}`),
    },
    specificationOptions: {
        view: `${Host}/specificationOptions`,
        add: `${Host}/specificationOptions`,
        bulkDelete: (id) => (`${Host}/specificationOptions/${id}`),
        getOne: (id) => (`${Host}/specificationOptions/${id}`),
        update: (id) => (`${Host}/specificationOptions/${id}`),
    },
    setting: {
        view: `${Host}/settings`,
        update: `${Host}/settings`,
    },
    
}
