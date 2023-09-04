export const isPagePermission = (item) => {
    return 1;
  };

export const renderMenuItems = (menuList, history) => {
return menuList.map((item) => {
    if (item.children?.length > 0 && isPagePermission(item)) {
    return {
        label: item.title,
        key: item.key,
        children: renderMenuItems(item.children, history),
    };
    }

    if (isPagePermission(item)) {
    return {
        label: item.title,
        key: item.key,
        onClick: () => {
        history.push(item.key);
        },
    };
    }

    return null;
}).filter(item => item !== null);
};
