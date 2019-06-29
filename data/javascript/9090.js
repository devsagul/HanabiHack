const defaultState = {
  count: 0,
  visible: {
    // true：显示欢迎界面，false：不显示
    hello: true,
    // true：显示侧边栏，false：不显示
    sidebar: false,
    // 0为不显示 1为显示但是隐藏 2隐藏到显示 3为显示到隐藏  可触发动画
    bottom: 0
  },
  globalEvent: {
    eventId: 0,
    eventType: '',
    eventComponent: ''
  },
  fetchData: {
    // FETCHSTART:开始请求 FETCHING:正在请求 FETCHEND:请求结束
    status: '',
    // 请求返回值
    data: {}
  },
  wrapClickPara: null,
  // 当前界面
  currentPage: 'main',
};

// 模块是否可见
export function visible(state = defaultState.visible, action) {
  const { type } = action;
  switch (type) {
    case 'SHOW_HELLO':
      return Object.assign({}, state, { hello: action.hello });
      // break;
    case 'SHOW_SIDEBAR':
      return Object.assign({}, state, { sidebar: action.sidebar });

    case 'SHOW_BOTTOMBAR':
      return Object.assign({}, state, { bottom: action.bottombar });

    default:
      return state;
  }
}

// 全局事件
export function globalEvent(state = defaultState.globalEvent, action) {
  const { type, eventType, eventComponent } = action;
  const { eventId } = state;
  switch (type) {
    case 'WRAP_CLICK_EVENT': {
      return Object.assign({}, state, { eventId: eventId + 1, eventType, eventComponent });
    }
    default:
      return state;
  }
}

// 请求
export function fetchData(state = defaultState.fetchData, action) {
  const { type } = action;
  switch (type) {
    case 'FETCH_START':
      return Object.assign({}, state, { status: 'FETCHSTART' });
      // break;
    case 'FETCH_ING':
      return Object.assign({}, state, { status: 'FETCHING' });
      // break;
    case 'FETCH_END':
      return Object.assign({}, state, { status: 'FETCHEND', data: action.data });
      // break;
    default:
      return state;
  }
}

export function count(state = defaultState.count, action) {
  const { type } = action;
  let { point } = action;
  switch (type) {
    case 'PLUS':
      point = state + point;
      return point;
      // break;
    case 'MINUS':
      point = state - point;
      return point;

    default:
      return state;
  }
}
