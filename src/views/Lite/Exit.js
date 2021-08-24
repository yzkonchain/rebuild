import { ethers } from 'ethers'
import { useContext, useReducer, useMemo, useEffect } from 'react'
import { context, liteContext } from '@/config'
import { MyButton, AmountInput, AmountShow, ApyFloatMessage } from '@/components/Modules'
import { ArrowForwardIosIcon } from '@/assets/svg'

const ZERO = ethers.constants.Zero
const INIT = {
  input: {
    coll: ZERO,
  },
  output: {
    want: ZERO,
  },
  tip: { fee: '0.0000', min: '0.000', slip: '0.00' },
  I: { coll: '' },
  old: { coll: '' },
}
const format = (num, n) => ethers.utils.formatUnits(num, n || 18)
const parse = (num, n) => ethers.utils.parseUnits(num || '0', n || 18)

export default function Exit() {
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
      const coll = parse(state.I.coll)
      if (!coll.eq(state.input.coll)) {
        const want = await controller.get_dy(coll, pool)
        if (want) {
          const tip = {
            fee: (format(want, pool.want.decimals) * (1 - format(data.swap.fee))).toFixed(4),
            min: (format(want, pool.want.decimals) * 0.995).toFixed(3),
            slip: controller.calc_slip(data, [null, want], pool).toPrecision(3),
            apy: data.apy.toPrecision(3),
          }
          setState({ input: { coll }, output: { want }, tip })
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
              title="coll"
              State={{
                state,
                setState,
                token: coll,
                max: data.balance.coll,
                if_max: data.balance.coll.gt('0'),
              }}
              style={{ height: '90px' }}
            />
          </div>
          <img alt="" src={ArrowForwardIosIcon} className={classes.icon} />
          <div>
            <AmountShow title="want" state={{ state, token: want }} style={{ height: '90px' }} />
          </div>
        </div>
        <ApyFloatMessage
          APY={state.tip.apy}
          info={[
            { 'Slippage tolerance': `${state.tip.slip} %` },
            { 'Minimum recieved': `${state.tip.min} ${want.symbol}` },
            { Route: `COLL -> ${want.symbol}` },
            { 'Nominal swap fee': `${state.tip.fee} ${want.symbol} ` },
          ]}
        />
        <div className={classes.buttonOne}>
          <div>
            <MyButton name="Approve" disabled />
            <MyButton
              name="Exit"
              onClick={async () =>
                (await handleClick('redeem')(state.output.want, state.input.coll)) && setState({ I: { coll: '' } })
              }
              disabled={ZERO.eq(state.output.want)}
            />
          </div>
        </div>
      </div>
    ),
    [state, data],
  )
}
