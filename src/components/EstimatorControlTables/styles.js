export const EstimatorControlStyles = {
    tableCard: {
        width: '90%',
        margin: 'auto',
        marginTop: 25
    },
    estimatorControlComponent: {
        textAlign: 'center',
        padding: 15,
        paddingBottom: 0
    },
    tableHeader: {
        backgroundColor: 'rgba(77, 71, 66)',
        '& *': {
            color: 'white'
        }
    },
    row: {
        '&:nth-of-type(even)': {
            backgroundColor: 'rgba(160, 156, 153)'
        },
        '&:nth-of-type(odd)': {
            backgroundColor: 'rgba(255, 255, 255, 1)'
        },
        maxWidth: '90%'
    },
    textField: {
        width: 60
    },
    textFieldFont: {
        fontSize: 12
    }
}