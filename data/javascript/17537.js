module.exports =
  (returnAfter, returnWith, shouldErr) => !shouldErr
    ? (fn) =>
        setTimeout(() => fn(null, returnWith), returnAfter)
    : (fn) =>
        setTimeout(() => fn(new Error('Sample error')), returnAfter)
