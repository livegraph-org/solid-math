import classNames from 'classnames'
import React from 'react'
import { useState } from 'react'
import Modal from 'react-modal'

// TODO maybe we don't need to use react-modal,
// maybe bulma modal will be sufficient

type WithModalHOC = <ButtonProps, ContentProps>(
  Button: React.FC<ButtonProps>,
  Content: React.FC<ContentProps>,
  title?: string,
) => React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    buttonProps?: ButtonProps
    contentProps?: ContentProps
    title?: string
  }
>

const withModal: WithModalHOC = <
  ButtonProps extends React.HTMLAttributes<HTMLElement>,
  ContentProps extends React.HTMLAttributes<HTMLElement>,
>(
  Button: React.FC<ButtonProps>,
  Content: React.FC<ContentProps>,
  title = '',
) => {
  const HOC = ({
    buttonProps = {} as ButtonProps,
    contentProps = {} as ContentProps,
    title: dynamicTitle = '',
    ...rest
  }: {
    buttonProps?: ButtonProps
    contentProps?: ContentProps
    title?: string
  } & React.HTMLAttributes<HTMLElement>) => {
    const [promptOpen, setPromptOpen] = useState(false)

    const finalTitle = dynamicTitle || title || ''

    return (
      <>
        <Button
          {...buttonProps}
          {...rest}
          className={classNames(buttonProps?.className, rest?.className)}
          onClick={e => {
            e.preventDefault()
            setPromptOpen(true)
            if (buttonProps.onClick) buttonProps.onClick(e)
          }}
        />

        {promptOpen && (
          <Modal
            isOpen={promptOpen}
            onRequestClose={() => setPromptOpen(false)}
            contentLabel={finalTitle}
            overlayClassName={{
              base: 'modal modal-background is-active',
              afterOpen: '',
              beforeClose: '',
            }}
            className={{
              base: 'modal-content',
              afterOpen: '',
              beforeClose: '',
            }}
            closeTimeoutMS={50}
          >
            <button
              className="modal-close"
              onClick={() => setPromptOpen(false)}
            >
              close
            </button>

            <div className="card">
              <header className="card-header">
                <p className="card-header-title">{finalTitle}</p>
              </header>
              <div className="card-content">
                <Content
                  {...contentProps}
                  onFinish={() => setPromptOpen(false)}
                />
              </div>
            </div>
          </Modal>
        )}
      </>
    )
  }

  HOC.displayName = `WithModal(${getDisplayName(Button)})`
  return HOC
}

function getDisplayName<T>(WrappedComponent: React.FC<T>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default withModal
