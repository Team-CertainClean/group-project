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
            backgroundColor: 'rgba(192, 190, 189, 0.6)'
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
    },
    formblock: {
        backgroundColor: 'lightgrey',
        borderRadius: '10vw',
        padding: '1vw',
        paddingBottom: '2vw'
     },
     submitButton: {
      
         backgroundSize: '200% auto',
         transition: '0.5s',
         backgroundImage: 'linear-gradient(to right, #ff8008 0%, #ffc837 51%, #fe981e 100%)',
         borderRadius: '200px',
         display: 'flex',
         backgroundColor: '#ef8902',
         // marginTop: '3vw',
         margin: '1vw',
         // padding: '2%',
         // paddingLeft: '4%',
         // paddingRight: '4%',
         fontSize: '2vw',
         color: 'white !important',
         '&:hover': {
           backgroundImage: 'linear-gradient(to right, #ff8008 0%, #ffc837 51%,#fbad40 100%)',
           backgroundColor: '#E8E8E8',
           backgroundPosition: 'right center'
         }
       },
}