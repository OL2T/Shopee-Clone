import { useRef, useState, useId, ElementType } from 'react'
import {
  FloatingPortal,
  useFloating,
  arrow,
  Placement,
  flip
} from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

interface PopoverProps {
  children: React.ReactNode
  popoverContent: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
}

export default function Popover({
  children,
  popoverContent,
  className,
  as: Element = 'div',
  initialOpen,
  placement = 'bottom-end'
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(initialOpen || false)
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, refs, floatingStyles, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [arrow({ element: arrowRef }), flip()],
    placement: placement
  })

  const id = useId()
  const placementTop = placement === 'top-start' || placement === 'top-end'

  return (
    <Element
      ref={refs.setReference}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={className}
    >
      <div className='stardust-popover' id='stardust-popover0'>
        <div role='button' className='stardust-popover__target'>
          {children}
        </div>
      </div>
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                display: 'block',
                top: placementTop ? y - 20 : y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData?.origin?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
              className='z-[100] relative'
            >
              <div className='relative top-[10px] bg-white min-w-[12.5rem] font-normal text-gray-900 z-[100] shadow-md rounded-sm'>
                <div
                  className={`absolute ${placementTop ? 'bottom-0' : 'top-0'} border-x-transparent border-t-transparent border-b-[10px]`}
                >
                  <span
                    ref={arrowRef}
                    style={{
                      left: middlewareData?.arrow?.x,
                      top: middlewareData?.arrow?.y
                    }}
                    className={`w-0 h-0 absolute ${placementTop ? 'translate-y-full border-t-[10px] border-t-white' : '-translate-y-full border-b-[10px] border-b-white'} border-x-transparent border-x-[14px] border-t-transparent border-t-[14px]`}
                  ></span>
                </div>
                {popoverContent}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
