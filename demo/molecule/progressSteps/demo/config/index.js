import React from 'react'
import {
  Content1,
  Content2,
  Content3,
  Content4,
  Content5,
  Content6
} from '../components/Contents'
import {PointerMapIcon, PaperPlaneIcon, ChatIcon, StarIcon} from '../Icons'
import {STATUSES} from '../../../../../components/molecule/progressSteps/src'

export const configBasic = {
  1: {
    label: 'Selección de Productos',
    content: <Content1 />,
    status: STATUSES.VISITED
  },
  2: {
    label: 'Tu pago seguro',
    content: <Content2 />,
    status: STATUSES.ACTIVE
  },
  3: {
    label: 'Resumen de tu compra',
    content: <Content3 />,
    status: STATUSES.NORMAL
  },
  4: {
    label: 'Valoración del proceso',
    content: <Content4 />,
    status: STATUSES.NORMAL
  }
}

export const configBasic6Steps = {
  1: {
    label: 'Step 1',
    content: <Content1 />,
    status: STATUSES.VISITED
  },
  2: {
    label: 'Step 2',
    content: <Content2 />,
    status: STATUSES.ACTIVE
  },
  3: {
    label: 'Step 3',
    content: <Content3 />,
    status: STATUSES.NORMAL
  },
  4: {
    label: 'Step 4',
    content: <Content4 />,
    status: STATUSES.NORMAL
  },
  5: {
    label: 'Step 5',
    content: <Content5 />,
    status: STATUSES.NORMAL
  },
  6: {
    label: 'Step 6',
    content: <Content6 />,
    status: STATUSES.NORMAL
  }
}

export const configWithIcons = {
  1: {
    label: 'Selección de Productos',
    content: <Content1 />,
    icon: <PointerMapIcon />,
    status: STATUSES.VISITED
  },
  2: {
    label: 'Tu pago seguro',
    content: <Content2 />,
    icon: <PaperPlaneIcon />,
    status: STATUSES.VISITED
  },
  3: {
    label: 'Resumen de tu compra',
    content: <Content3 />,
    icon: <ChatIcon />,
    status: STATUSES.ACTIVE
  },
  4: {
    label: 'Valoración del proceso',
    content: <Content4 />,
    icon: <StarIcon />,
    status: STATUSES.NORMAL
  }
}
