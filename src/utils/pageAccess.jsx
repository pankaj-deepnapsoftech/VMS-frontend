
let access = null;
let isRole = null;

export const isViewAccess = (authenticate, location) => {
    access = authenticate?.allowed_path?.filter((item) => item.value === location.pathname)[0];
    isRole = authenticate?.role
    return authenticate?.role && !access?.permission?.includes("view");
}

export const isCreateAccess = () => {
    return !isRole || access?.permission?.includes("create");
}

export const isHaveAction = () => {
    return !isRole || (access?.permission?.includes("delete") || access?.permission?.includes("modify")); 
}


export const isModifyAccess = () => {
    return !isRole || access?.permission?.includes("modify");
}

export const isDeleteAccess = () => {
    return !isRole || access?.permission?.includes("delete")
}