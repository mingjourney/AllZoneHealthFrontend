export const FoldReducer = (prevState = {
    isFold: false
}, action) => {
    let { type } = action
    switch (type) {
        case 'change_isFold':
            let newState = { ...prevState }
            newState.isFold = !newState.isFold;
            return newState;
        default:
            return prevState;
    }
}