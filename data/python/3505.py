class Error(Exception):
    """Base class for exceptions in this module."""
    pass

class ProtocolError(Error):
    """We're expecting something else from this protocol"""
    pass

def expr_raise(exception, *args):
    """Use if you want to raise an exception as an expression.

    As raise is a statement, instead of a function, you can't raise
    an exception in for example a lambda. Use this fn to get around this.
    
    args:
    - exception: the exception class you want to raise
    - *args: the args to pass to the exception"""
    raise exception(*args)
