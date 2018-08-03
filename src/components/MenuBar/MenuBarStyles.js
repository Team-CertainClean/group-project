const MenuBarStyles = {
    bar: {
        width: '20rem',
        height: '4rem',
        position: 'relative',
        top: '8vh',
        backgroundColor: 'rgba(77, 71, 66)',
        '& *': {
            color: 'white'
        }
    },
    list: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)'
    },
    listOption: {
        display: 'inline',
        textAlign: 'center'
    }
}

export default MenuBarStyles;