import { ethers } from 'ethers'
import { useContext, useReducer, useMemo, useEffect } from 'react'
import { context, liteContext } from '@/config'
import { MyButton, AmountInput, AmountShow, ApyFloatMessage } from '@/components/Modules'
import { ArrowForwardIosIcon } from '@/assets/svg'

const ZERO = ethers.constants.Zero
const INIT = {
  input: {
    bond: ZERO,
  },
  output: {
    want: ZERO,
  },
  tip: { fee: '0.0000', min: '0.000', slip: '0.00' },
  I: { bond: '' },
  old: { bond: '' },
}
const format = (num, n) => ethers.utils.formatUnits(num, n || 18)
const parse = (num, n) => ethers.utils.parseUnits(num || '0', n || 18)

export default function Borrow() {
  const {
    state: { signer, controller },
  } = useContext(context)
  const {
    liteState: { pool, bond, want, data },
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
      const bond = parse(state.I.bond, pool.bond.decimals)
      if (!bond.eq(state.input.bond)) {
        const want = await controller.get_dy(bond, pool)
        if (want) {
          const tip = {
            fee: (format(want, pool.want.decimals) * (1 - format(data.swap.fee))).toFixed(4),
            min: (format(want, pool.want.decimals) * 0.995).toFixed(3),
            slip: controller.calc_slip(data, [bond, null], pool).toPrecision(3),
            apy: data.apy.toPrecision(3),
          }
          setState({ input: { bond }, output: { want }, tip })
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
              title="bond"
              State={{
                state,
                setState,
                token: bond,
                max: data.balance.bond,
                if_max: data.allowance.bond.gt('100000000000000000000000000000000'),
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
            { 'Minimum recieved': `${state.tip.min}` },
            { Route: `${bond.symbol} -> COLL -> ${want.symbol}` },
            { 'Nominal swap fee': `${state.tip.fee} ${want.symbol}` },
          ]}
        />
        <div className={classes.buttonOne}>
          <div>
            <MyButton
              name="Approve"
              onClick={() => handleClick('approve')(bond.addr)}
              disabled={!signer || data.allowance.bond.gt('100000000000000000000000000000000')}
            />
            <MyButton
              name="Deposit & Borrow"
              onClick={async () =>
                (await handleClick('borrow')(state.input.bond, state.output.want)) && setState({ I: { bond: '' } })
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
