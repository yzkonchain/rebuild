import { ethers } from 'ethers'
import { useContext, useReducer, useMemo, useEffect } from 'react'
import { context, liteContext } from '@/config'
import { MyButton, AmountInput, AmountShow, ApyFloatMessage } from '@/components/Modules'
import { ArrowForwardIosIcon } from '@/assets/svg'

const ZERO = ethers.constants.Zero
const INIT = {
  input: {
    want: ZERO,
  },
  output: {
    coll: ZERO,
  },
  tip: { fee: '0.0000', min: '0.000', slip: '0.00' },
  I: { want: '' },
  old: { want: '' },
}
const format = (num, n) => ethers.utils.formatUnits(num, n || 18)
const parse = (num, n) => ethers.utils.parseUnits(num || '0', n || 18)

export default function Lend() {
  const {
    state: { signer, controller },
  } = useContext(context)
  const {
    liteState: { bond, want, coll, pool, data },
    classesChild: classes,
    setLiteState,
    handleClick,
  } = useContext(liteContext)
  INIT.tip.apy = data.apy.toPrecision(3)
  const [state, setState] = useReducer((o, n) => ({ ...o, ...n }), INIT)

  useEffect(() => state == INIT || setState(INIT), [pool])
  useEffect(() => {
    if (!signer || ZERO.eq(data.swap.sk)) return
    ;(async () => {
      const want = parse(state.I.want, pool.want.decimals)
      if (!want.eq(state.input.want)) {
        const coll = await controller.get_dx(want, pool)
        if (coll) {
          const tip = {
            fee: (format(coll) * (1 - format(data.swap.fee))).toFixed(4),
            min: (format(coll) * 0.995).toFixed(3),
            slip: controller.calc_slip(data, [null, want], pool).toPrecision(3),
            apy: data.apy.toPrecision(3),
          }
          setState({ input: { want }, output: { coll }, tip })
        }
      }
    })()
  }, [state])

  return useMemo(
    () => (
      <div className={classes.root}>
        <div className={classes.amount}>
          <div>
            <AmountInput
              title="want"
              State={{
                state,
                setState,
                token: want,
                max: data.balance.want,
                if_max: data.allowance.want.gt('100000000000000000000000000000000'),
              }}
              style={{ height: '90px' }}
            />
          </div>
          <img alt="" src={ArrowForwardIosIcon} className={classes.icon} />
          <div>
            <AmountShow title="coll" state={{ state, token: coll }} style={{ height: '90px' }} />
          </div>
        </div>
        <ApyFloatMessage
          APY={state.tip.apy}
          info={[
            { 'Slippage tolerance': `${state.tip.slip} %` },
            { 'Minimum recieved': `${state.tip.min} COLL` },
            { Route: `${want.symbol} -> COLL` },
            { 'Nominal swap fee': `${state.tip.fee} COLL` },
          ]}
        />
        <div className={classes.buttonOne}>
          <div>
            <MyButton
              name="Approve"
              onClick={() => handleClick('approve')(want.addr)}
              disabled={!signer || data.allowance.want.gt('100000000000000000000000000000000')}
            />
            <MyButton
              name="Lend"
              onClick={async () =>
                (await handleClick('lend')(state.input.want, state.output.coll)) && setState({ I: { want: '' } })
              }
              disabled={ZERO.eq(state.output.coll)}
            />
          </div>
        </div>
      </div>
    ),
    [state, data],
  )
}
