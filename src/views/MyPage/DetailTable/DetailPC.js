import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Table, TableBody, TableCell as OldTableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { MyButtonWhite } from '@/components/Modules'
import { Price } from '@/hooks'
import { Class } from '@material-ui/icons'

const useStyles = makeStyles({
  root: {
    '@media screen and (max-width:960px)': {
      display: 'none',
    },
    '@media screen and (min-width:960px)': {
      '&>div>table': {
        '& tr': {
          borderBottom: '#D8D8D8 1px solid',
        },
        '& th,& td': {
          color: 'white',
          padding: 0,
          border: 'none',
          fontSize: '18px',
          fontFamily: 'Gillsans',
          whiteSpace: 'nowrap',
        },
        '& button': {
          width: '133px',
        },
      },
    },
  },
  tokenOne: {
    margin: '10px 0',
    textAlign: 'center',
    width: 'fit-content',
    '& img': {
      display: 'block',
      width: '40px',
      marginBottom: '5px',
    },
  },
  tokenTwo: {
    margin: '10px 0',
    textAlign: 'center',
    width: 'fit-content',
    '& img': {
      width: '40px',
      marginBottom: '5px',
      '&:nth-child(2)': {
        position: 'relative',
        left: '-15px',
      },
    },
  },
  tableHead: {
    '& th': {
      paddingBottom: '10px !important',
    },
  },
  cellWidthEmpty: {
    width: 0,
  },
  button: {
    textAlign: 'right',
    margin: '10px 0',
    width: 0,
  },
  price: {
    fontSize: '10px',
    color: '#99A8C9',
  },
})

const TableCell = withStyles({ root: { lineHeight: 'unset' } })((props) => <OldTableCell {...props} />)

const dec = {
  apy: 2,
  apr: 2,
  sop: 2,
  balance: 3,
  earned: 3,
  price: 3,
}

export default function PC({ pool, val, handleClick }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <TableContainer>
        <Table>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>Token</TableCell>
              <TableCell align="center">Balance</TableCell>
              <TableCell align="center">APY</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className={classes.cellWidthEmpty}>
                <div className={classes.tokenOne}>
                  <img src={pool.coll.icon} alt="" />
                  <span>COLL</span>
                </div>
              </TableCell>
              <TableCell align="center">
                <div>{parseFloat(val.coll).toFixed(dec.balance)}</div>
                <div className={classes.price}>~${parseFloat(val.coll * Price['COLL']).toFixed(dec.price)}</div>
              </TableCell>
              <TableCell align="center">{parseFloat(val.coll_apy).toFixed(dec.apy)}%</TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell className={classes.button}>
                <MyButtonWhite name="Redeem All" onClick={() => handleClick('redeemAll', pool)} />
                <MyButtonWhite name="Settle" onClick={() => handleClick('settle', pool)} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className={classes.tokenOne}>
                  <img src={pool.call.icon} alt="" />
                  <span>CALL</span>
                </div>
              </TableCell>
              <TableCell align="center">
                <div>{parseFloat(val.call).toFixed(dec.balance)}</div>
                <div className={classes.price}>~${parseFloat(val.call * Price['COLL']).toFixed(dec.price)}</div>
              </TableCell>
              <TableCell align="center">{parseFloat(val.call_apy).toFixed(dec.apy)}%</TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell className={classes.button}>
                <MyButtonWhite name="Repay All" onClick={() => handleClick('repayAll', pool)} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Token</TableCell>
              <TableCell align="center">Balance</TableCell>
              <TableCell align="center">APY</TableCell>
              <TableCell align="center">APR</TableCell>
              <TableCell align="center" style={{ padding: '15px 0' }}>
                Share of
                <br />
                Pool
              </TableCell>
              <TableCell align="center">
                Claimable
                <br />
                COLLAR
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className={classes.tokenTwo}>
                  <img src={pool.coll.icon} alt="" />
                  <img src={pool.want.icon} alt="" />
                  <br />
                  <span>COLL/{pool.want.symbol}</span>
                </div>
              </TableCell>
              <TableCell align="center">
                <div>{parseFloat(val.clpt).toFixed(dec.balance)}</div>
                <div className={classes.price}>~${parseFloat(val.coll * Price['COLL']).toFixed(dec.price)}</div>
              </TableCell>
              <TableCell align="center">{parseFloat(val.clpt_apy).toFixed(dec.apy)}%</TableCell>
              <TableCell align="center">{parseFloat(val.clpt_apr).toFixed(dec.apr)}%</TableCell>
              <TableCell align="center">{parseFloat(val.shareOfPoll).toFixed(dec.sop)}%</TableCell>
              <TableCell align="center">
                <div>{parseFloat(val.earned).toFixed(dec.earned)}</div>
                <div className={classes.price}>~${parseFloat(val.earned * Price['COLLAR']).toFixed(dec.price)}</div>
              </TableCell>
              <TableCell className={classes.button}>
                <MyButtonWhite name={'Withdraw All'} onClick={() => handleClick('withdrawAll', pool)} />
                <MyButtonWhite name={'Claim'} onClick={() => handleClick('claim', pool.pool)} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
