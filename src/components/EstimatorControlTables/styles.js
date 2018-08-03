export const EstimatorControlStyles = {
    tableCard: {
        width: '85%',
        margin: 'auto',
        marginTop: 25,
        backgroundColor: 'rgba(125, 118, 110)'
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
            backgroundColor: 'rgba(255, 148, 46, 1)'
        },
        '&:nth-of-type(odd)': {
            backgroundColor: 'rgba(255, 255, 255, 1)'
        }
    }
}