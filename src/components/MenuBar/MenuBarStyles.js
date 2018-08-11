const MenuBarStyles = {
    bar: {
        width: '35rem',
        height: '4rem',
        position: 'relative',
        top: '8vh',
        backgroundColor: 'rgba(77, 71, 66)',
        '& *': {
            color: 'white'
        },
    },
    list: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
    },
    listOption: {
        display: 'inline',
        textAlign: 'center'
    }
}

export default MenuBarStyles;