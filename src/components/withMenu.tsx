import React from 'react'
import { useState } from 'react'

type WithMenuHOC = <ButtonProps, MenuProps>(
  Button: React.FC<ButtonProps>,
  Menu: React.FC<MenuProps & CloseHandler>,
) => React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    buttonProps: ButtonProps
    menuProps: MenuProps
  }
>

interface CloseHandler {
  onClickClose: () => void
}

const withMenu: WithMenuHOC = <
  ButtonProps extends React.HTMLAttributes<HTMLElement>,
  MenuProps extends React.HTMLAttributes<HTMLElement>,
>(
  Button: React.FC<ButtonProps>,
  Menu: React.FC<MenuProps & CloseHandler>,
) => {
  const HOC = ({
    buttonProps,
    menuProps,
    ...props
  }: {
    buttonProps: ButtonProps
    menuProps: MenuProps
  }) => {
    const [open, setOpen] = useState(false)

    return (
      <div
        {...props}
        style={{
          position: 'relative',
          flexDirection: 'column',
          display: 'inline-flex',
          alignItems: 'end',
          zIndex: 3,
        }}
        onMouseLeave={() => setOpen(false)}
        onBlur={event => {
          // https://stackoverflow.com/a/60094794
          // make sure the blur works when leaving the whole thing only
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setOpen(false)
          }
        }}
      >
        <Button
          {...buttonProps}
          onMouseEnter={() => setOpen(true)}
          onFocus={() => setOpen(true)}
        />
        <div
          style={{
            position: 'relative',
            width: 0,
            height: 0,
            visibility: open ? 'visible' : 'hidden',
          }}
        >
          <div
            className="box p-0"
            style={{ position: 'absolute', right: 0, overflow: 'hidden' }}
          >
            <Menu {...menuProps} onClickClose={() => setOpen(false)} />
          </div>
        </div>
      </div>
    )
  }

  HOC.displayName = `WithMenu(${getDisplayName(Button)})`
  return HOC
}

function getDisplayName<T>(WrappedComponent: React.FC<T>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default withMenu
