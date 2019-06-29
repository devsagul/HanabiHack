#include "analyze.h"
#include "xalloc.h"

static void no_floats(expression *v) __attribute__ ((noreturn));

static void no_floats(expression *v) {
  fail("floats are not allowed", v);
}

static void replace_cast(expression **value, cast_type cast, type_type target) {
  expression *new_cast = xmalloc(sizeof(*new_cast));
  new_cast->operation.type = O_CAST;
  new_cast->operation.cast_type = cast;
  new_cast->type = new_type(target);
  new_cast->value = *value;
  new_cast->next = (*value)->next;
  (*value)->next = NULL;
  *value = new_cast;
}

expression *bool_cast(expression *value) {
  type t = {.type = T_BOOL};
  return implicit_cast(value, &t);
}

void explicit_cast(expression *value) {
  type_type etype = value->type->type, vtype = value->value->type->type;

  cast_type cmethod;

  if (equivalent_type(value->value->type, value->type)) {
    fail("noop explicit cast not supported", value);
  }

  switch ((((uint8_t) etype) << 8) | (uint8_t) vtype) {
  case (T_F32 << 8) | T_F64:
  case (T_F32 << 8) | T_F128:
  case (T_F64 << 8) | T_F128:
    cmethod = O_FLOAT_TRUNCATE;
    break;
  case (T_F64 << 8) | T_F32:
  case (T_F128 << 8) | T_F32:
  case (T_F128 << 8) | T_F64:
    cmethod = O_FLOAT_EXTEND;
    break;
  case (T_F32 << 8) | T_S8:
  case (T_F32 << 8) | T_S16:
  case (T_F32 << 8) | T_S32:
  case (T_F32 << 8) | T_S64:
  case (T_F64 << 8) | T_S8:
  case (T_F64 << 8) | T_S16:
  case (T_F64 << 8) | T_S32:
  case (T_F64 << 8) | T_S64:
  case (T_F128 << 8) | T_S8:
  case (T_F128 << 8) | T_S16:
  case (T_F128 << 8) | T_S32:
  case (T_F128 << 8) | T_S64:
    cmethod = O_SIGNED_TO_FLOAT;
    break;
  case (T_F32 << 8) | T_U8:
  case (T_F32 << 8) | T_U16:
  case (T_F32 << 8) | T_U32:
  case (T_F32 << 8) | T_U64:
  case (T_F64 << 8) | T_U8:
  case (T_F64 << 8) | T_U16:
  case (T_F64 << 8) | T_U32:
  case (T_F64 << 8) | T_U64:
  case (T_F128 << 8) | T_U8:
  case (T_F128 << 8) | T_U16:
  case (T_F128 << 8) | T_U32:
  case (T_F128 << 8) | T_U64:
    cmethod = O_UNSIGNED_TO_FLOAT;
    break;
  case (T_S8 << 8) | T_F32:
  case (T_S8 << 8) | T_F64:
  case (T_S8 << 8) | T_F128:
  case (T_S16 << 8) | T_F32:
  case (T_S16 << 8) | T_F64:
  case (T_S16 << 8) | T_F128:
  case (T_S32 << 8) | T_F32:
  case (T_S32 << 8) | T_F64:
  case (T_S32 << 8) | T_F128:
  case (T_S64 << 8) | T_F32:
  case (T_S64 << 8) | T_F64:
  case (T_S64 << 8) | T_F128:
    cmethod = O_FLOAT_TO_SIGNED;
    break;
  case (T_S8 << 8) | T_U8:
  case (T_S16 << 8) | T_U16:
  case (T_S32 << 8) | T_U32:
  case (T_S64 << 8) | T_U64:
  case (T_U8 << 8) | T_S8:
  case (T_U16 << 8) | T_S16:
  case (T_U32 << 8) | T_S32:
  case (T_U64 << 8) | T_S64:
    cmethod = O_REINTERPRET;
    break;
  case (T_S16 << 8) | T_S8:
  case (T_S32 << 8) | T_S8:
  case (T_S32 << 8) | T_S16:
  case (T_S64 << 8) | T_S8:
  case (T_S64 << 8) | T_S16:
  case (T_S64 << 8) | T_S32:
    cmethod = O_SIGN_EXTEND;
    break;
  case (T_S8 << 8) | T_S16:
  case (T_S8 << 8) | T_S32:
  case (T_S8 << 8) | T_S64:
  case (T_S8 << 8) | T_U16:
  case (T_S8 << 8) | T_U32:
  case (T_S8 << 8) | T_U64:
  case (T_S16 << 8) | T_S32:
  case (T_S16 << 8) | T_S64:
  case (T_S16 << 8) | T_U32:
  case (T_S16 << 8) | T_U64:
  case (T_S32 << 8) | T_S64:
  case (T_S32 << 8) | T_U64:
  case (T_U8 << 8) | T_S16:
  case (T_U8 << 8) | T_S32:
  case (T_U8 << 8) | T_S64:
  case (T_U8 << 8) | T_U16:
  case (T_U8 << 8) | T_U32:
  case (T_U8 << 8) | T_U64:
  case (T_U16 << 8) | T_S32:
  case (T_U16 << 8) | T_S64:
  case (T_U16 << 8) | T_U32:
  case (T_U16 << 8) | T_U64:
  case (T_U32 << 8) | T_S64:
  case (T_U32 << 8) | T_U64:
    cmethod = O_TRUNCATE;
    break;
  case (T_S16 << 8) | T_U8:
  case (T_S32 << 8) | T_U8:
  case (T_S32 << 8) | T_U16:
  case (T_S64 << 8) | T_U8:
  case (T_S64 << 8) | T_U16:
  case (T_S64 << 8) | T_U32:
  case (T_U16 << 8) | T_S8:
  case (T_U16 << 8) | T_U8:
  case (T_U32 << 8) | T_S8:
  case (T_U32 << 8) | T_S16:
  case (T_U32 << 8) | T_U8:
  case (T_U32 << 8) | T_U16:
  case (T_U64 << 8) | T_S8:
  case (T_U64 << 8) | T_S16:
  case (T_U64 << 8) | T_S32:
  case (T_U64 << 8) | T_U8:
  case (T_U64 << 8) | T_U16:
  case (T_U64 << 8) | T_U32:
    cmethod = O_ZERO_EXTEND;
    break;
  case (T_U8 << 8) | T_F32:
  case (T_U8 << 8) | T_F64:
  case (T_U8 << 8) | T_F128:
  case (T_U16 << 8) | T_F32:
  case (T_U16 << 8) | T_F64:
  case (T_U16 << 8) | T_F128:
  case (T_U32 << 8) | T_F32:
  case (T_U32 << 8) | T_F64:
  case (T_U32 << 8) | T_F128:
  case (T_U64 << 8) | T_F32:
  case (T_U64 << 8) | T_F64:
  case (T_U64 << 8) | T_F128:
    cmethod = O_FLOAT_TO_UNSIGNED;
    break;
  case (T_ARRAY << 8) | T_ARRAY:
    fail("incompatible array type", value);
  case (T_BLOCKREF << 8) | T_BLOCKREF:
    fail("incompatible function type", value);
  case (T_OBJECT << 8) | T_OBJECT: {
    if (!value->type->classtype) {
      // TODO: shouldn't this be allowed?
      // it's ok, we're assigning a null literal to an object variable
      fail("explicit cast from null literal not supported", value);
    }

    bool can_cast = false;
    class *the_class = value->value->type->classtype,
      *eclass = value->type->classtype;

    while ((the_class = the_class->parent) != NULL) {
      if (the_class == eclass) {
        // upcast!
        cmethod = O_UPCAST;
        can_cast = true;
        break;
      }
    }

    if (can_cast) {
      break;
    }

    // TODO: support unchecked downcasting
    the_class = eclass;
    eclass = value->value->type->classtype;

    while ((the_class = the_class->parent) != NULL) {
      if (the_class == eclass) {
        // downcast!
        cmethod = O_DOWNCAST;
        can_cast = true;
        break;
      }
    }

    if (can_cast) {
      break;
    }

    fail("'%s' is not compatible with '%s'", value, eclass->class_name,
      value->type->classtype->class_name);
  }
  case (T_BOOL << 8) | T_S8:
  case (T_BOOL << 8) | T_S16:
  case (T_BOOL << 8) | T_S32:
  case (T_BOOL << 8) | T_S64:
  case (T_BOOL << 8) | T_U8:
  case (T_BOOL << 8) | T_U16:
  case (T_BOOL << 8) | T_U32:
  case (T_BOOL << 8) | T_U64: {
    expression *right = new_literal_node(vtype);

    switch (vtype) {
    case T_S8: right->value_s8 = 0; break;
    case T_S16: right->value_s16 = 0; break;
    case T_S32: right->value_s32 = 0; break;
    case T_S64: right->value_s64 = 0; break;
    case T_U8: right->value_u8 = 0; break;
    case T_U16: right->value_u16 = 0; break;
    case T_U32: right->value_u32 = 0; break;
    case T_U64: right->value_u64 = 0; break;
    default:
      fail("cannot explicitly convert non-integer to boolean", value);
    }

    value->operation.type = O_COMPARE;
    value->operation.compare_type = O_NE;
    value->value->next = right;
    return;
  }
  case (T_STRING << 8) | T_ARRAY:
    // TODO: utf-8 support
    if (value->value->type->arraytype->type == T_U8) {
      // TODO: only allow this kind of casting in core code!
      cmethod = O_REINTERPRET;
      break;
    }
    // fallthrough
  default:
    fail("incompatible types in explicit cast", value);
  }

  value->operation.cast_type = cmethod;
}

// caller is responsible for correctly assigning next field of return value if
// changed
expression *implicit_cast(expression *value, type *expected) {
  type_type etype = expected->type, vtype = value->type->type;

  cast_type cmethod;

  if (equivalent_type(value->type, expected)) {
    return value;
  }

  switch ((((uint8_t) etype) << 8) | (uint8_t) vtype) {
  case (T_F32 << 8) | T_F64:
  case (T_F32 << 8) | T_F128:
  case (T_F32 << 8) | T_S32:
  case (T_F32 << 8) | T_S64:
  case (T_F32 << 8) | T_U32:
  case (T_F32 << 8) | T_U64:
  case (T_F64 << 8) | T_F128:
  case (T_F64 << 8) | T_S64:
  case (T_F64 << 8) | T_U64:
  case (T_S8 << 8) | T_F32:
  case (T_S8 << 8) | T_F64:
  case (T_S8 << 8) | T_F128:
  case (T_S8 << 8) | T_S16:
  case (T_S8 << 8) | T_S32:
  case (T_S8 << 8) | T_S64:
  case (T_S8 << 8) | T_U16:
  case (T_S8 << 8) | T_U32:
  case (T_S8 << 8) | T_U64:
  case (T_S16 << 8) | T_F32:
  case (T_S16 << 8) | T_F64:
  case (T_S16 << 8) | T_F128:
  case (T_S16 << 8) | T_S32:
  case (T_S16 << 8) | T_S64:
  case (T_S16 << 8) | T_U32:
  case (T_S16 << 8) | T_U64:
  case (T_S32 << 8) | T_F32:
  case (T_S32 << 8) | T_F64:
  case (T_S32 << 8) | T_F128:
  case (T_S32 << 8) | T_S64:
  case (T_S32 << 8) | T_U64:
  case (T_S64 << 8) | T_F64:
  case (T_S64 << 8) | T_F128:
  case (T_U8 << 8) | T_F32:
  case (T_U8 << 8) | T_F64:
  case (T_U8 << 8) | T_F128:
  case (T_U8 << 8) | T_S16:
  case (T_U8 << 8) | T_S32:
  case (T_U8 << 8) | T_S64:
  case (T_U8 << 8) | T_U16:
  case (T_U8 << 8) | T_U32:
  case (T_U8 << 8) | T_U64:
  case (T_U16 << 8) | T_F32:
  case (T_U16 << 8) | T_F64:
  case (T_U16 << 8) | T_F128:
  case (T_U16 << 8) | T_S32:
  case (T_U16 << 8) | T_S64:
  case (T_U16 << 8) | T_U32:
  case (T_U16 << 8) | T_U64:
  case (T_U32 << 8) | T_F32:
  case (T_U32 << 8) | T_F64:
  case (T_U32 << 8) | T_F128:
  case (T_U32 << 8) | T_S64:
  case (T_U32 << 8) | T_U64:
  case (T_U64 << 8) | T_F64:
  case (T_U64 << 8) | T_F128:
    fail("possible loss of precision during implicit conversion", value);
  case (T_F32 << 8) | T_S8:
  case (T_F32 << 8) | T_S16:
  case (T_F64 << 8) | T_S8:
  case (T_F64 << 8) | T_S16:
  case (T_F64 << 8) | T_S32:
  case (T_F128 << 8) | T_S8:
  case (T_F128 << 8) | T_S16:
  case (T_F128 << 8) | T_S32:
  case (T_F128 << 8) | T_S64:
    cmethod = O_SIGNED_TO_FLOAT;
    break;
  case (T_F32 << 8) | T_U8:
  case (T_F32 << 8) | T_U16:
  case (T_F64 << 8) | T_U8:
  case (T_F64 << 8) | T_U16:
  case (T_F64 << 8) | T_U32:
  case (T_F128 << 8) | T_U8:
  case (T_F128 << 8) | T_U16:
  case (T_F128 << 8) | T_U32:
  case (T_F128 << 8) | T_U64:
    cmethod = O_UNSIGNED_TO_FLOAT;
    break;
  case (T_F64 << 8) | T_F32:
  case (T_F128 << 8) | T_F32:
  case (T_F128 << 8) | T_F64:
    cmethod = O_FLOAT_EXTEND;
    break;
  case (T_S8 << 8) | T_U8:
  case (T_S16 << 8) | T_U16:
  case (T_S32 << 8) | T_U32:
  case (T_S64 << 8) | T_U64:
  case (T_U8 << 8) | T_S8:
  case (T_U16 << 8) | T_S16:
  case (T_U32 << 8) | T_S32:
  case (T_U64 << 8) | T_S64:
    cmethod = O_REINTERPRET;
    break;
  case (T_S16 << 8) | T_S8:
  case (T_S32 << 8) | T_S8:
  case (T_S32 << 8) | T_S16:
  case (T_S64 << 8) | T_S8:
  case (T_S64 << 8) | T_S16:
  case (T_S64 << 8) | T_S32:
    cmethod = O_SIGN_EXTEND;
    break;
  case (T_S16 << 8) | T_U8:
  case (T_S32 << 8) | T_U8:
  case (T_S32 << 8) | T_U16:
  case (T_S64 << 8) | T_U8:
  case (T_S64 << 8) | T_U16:
  case (T_S64 << 8) | T_U32:
  case (T_U16 << 8) | T_S8:
  case (T_U16 << 8) | T_U8:
  case (T_U32 << 8) | T_S8:
  case (T_U32 << 8) | T_S16:
  case (T_U32 << 8) | T_U8:
  case (T_U32 << 8) | T_U16:
  case (T_U64 << 8) | T_S8:
  case (T_U64 << 8) | T_S16:
  case (T_U64 << 8) | T_S32:
  case (T_U64 << 8) | T_U8:
  case (T_U64 << 8) | T_U16:
  case (T_U64 << 8) | T_U32:
    cmethod = O_ZERO_EXTEND;
    break;
  case (T_S64 << 8) | T_F32:
    cmethod = O_FLOAT_TO_SIGNED;
    break;
  case (T_U64 << 8) | T_F32:
    cmethod = O_FLOAT_TO_UNSIGNED;
    break;
  case (T_ARRAY << 8) | T_ARRAY:
    fail("incompatible array type", value);
  case (T_ARRAY << 8) | T_OBJECT:
    if (!value->type->classtype) {
      // it's ok, we're assigning a null literal to an array variable
      return value;
    }
    fail("incompatible types", value);
  case (T_BLOCKREF << 8) | T_BLOCKREF:
    fail("incompatible function type", value);
  case (T_OBJECT << 8) | T_OBJECT: {
    if (!value->type->classtype) {
      // it's ok, we're assigning a null literal to an object variable
      return value;
    }

    bool can_upcast = false;
    class *the_class = value->type->classtype, *eclass = expected->classtype;

    while ((the_class = the_class->parent) != NULL) {
      if (the_class == eclass) {
        // upcast!
        cmethod = O_UPCAST;
        can_upcast = true;
        break;
      }
    }

    if (!can_upcast) {
      fail("'%s' incompatible with '%s'", value,
        value->type->classtype->class_name, eclass->class_name);
    }

    break;
  }
  case (T_BOOL << 8) | T_S8:
  case (T_BOOL << 8) | T_S16:
  case (T_BOOL << 8) | T_S32:
  case (T_BOOL << 8) | T_S64:
  case (T_BOOL << 8) | T_U8:
  case (T_BOOL << 8) | T_U16:
  case (T_BOOL << 8) | T_U32:
  case (T_BOOL << 8) | T_U64: {
    expression *right = new_literal_node(vtype);

    switch (vtype) {
    case T_S8: right->value_s8 = 0; break;
    case T_S16: right->value_s16 = 0; break;
    case T_S32: right->value_s32 = 0; break;
    case T_S64: right->value_s64 = 0; break;
    case T_U8: right->value_u8 = 0; break;
    case T_U16: right->value_u16 = 0; break;
    case T_U32: right->value_u32 = 0; break;
    case T_U64: right->value_u64 = 0; break;
    default:
      fail("cannot implicitly convert non-integer to boolean", value);
    }

    return new_compare_node(O_NE, value, right);
  }
  case (T_STRING << 8) | T_OBJECT:
    if (value->operation.type == O_LITERAL) {
      return value;
    }
    // fallthrough
  default:
    fail("incompatible types", value);
  }

  expression *cast = xmalloc(sizeof(*cast));
  cast->operation.type = O_CAST;
  cast->operation.cast_type = cmethod;
  cast->type = copy_type(expected);
  cast->value = value;
  return cast;
}

expression *numeric_promotion(expression *value, bool allow_floats) {
  type_type ctype;
  cast_type cmethod;
  switch (value->type->type) {
  case T_F32:
  case T_F64:
  case T_F128:
    if (!allow_floats) no_floats(value);
    // fallthrough
  case T_S32:
  case T_S64:
  case T_U32:
  case T_U64:
    return value;
  case T_S8:
  case T_S16:
    ctype = T_S32;
    cmethod = O_SIGN_EXTEND;
    break;
  case T_U8:
  case T_U16:
    ctype = T_U32;
    cmethod = O_ZERO_EXTEND;
    break;
  default:
    fail("must be a numeric expression", value);
  }

  expression *cast = xmalloc(sizeof(*cast));
  cast->operation.type = O_CAST;
  cast->operation.cast_type = cmethod;
  cast->type = new_type(ctype);
  cast->value = value;
  cast->next = NULL;
  return cast;
}

// doesn't promote to 32-bit, only supports integer types
type_type binary_numeric_conversion(expression *value/*, bool allow_floats*/) {
  expression *left = value->value, *right = left->next;
  type_type ltype = left->type->type, rtype = right->type->type;

  if (is_float(left->type) || is_float(right->type)) {
    no_floats(value);
  }

  switch ((((uint8_t) ltype) << 8) | (uint8_t) rtype) {
  case (T_S8 << 8) | T_S8:
  case (T_S16 << 8) | T_S16:
  case (T_S32 << 8) | T_S32:
  case (T_S64 << 8) | T_S64:
  case (T_U8 << 8) | T_U8:
  case (T_U16 << 8) | T_U16:
  case (T_U32 << 8) | T_U32:
  case (T_U64 << 8) | T_U64:
    // no casting necessary!
    return ltype;
  case (T_S8 << 8) | T_S16:
  case (T_S8 << 8) | T_S32:
  case (T_S8 << 8) | T_S64:
  case (T_S16 << 8) | T_S32:
  case (T_S16 << 8) | T_S64:
  case (T_S32 << 8) | T_S64:
    replace_cast(&value->value, O_SIGN_EXTEND, rtype);
    return rtype;
  case (T_S16 << 8) | T_S8:
  case (T_S32 << 8) | T_S8:
  case (T_S32 << 8) | T_S16:
  case (T_S64 << 8) | T_S8:
  case (T_S64 << 8) | T_S16:
  case (T_S64 << 8) | T_S32:
    replace_cast(&left->next, O_SIGN_EXTEND, ltype);
    return ltype;
  case (T_U8 << 8) | T_S16:
  case (T_U8 << 8) | T_S32:
  case (T_U8 << 8) | T_S64:
  case (T_U8 << 8) | T_U16:
  case (T_U8 << 8) | T_U32:
  case (T_U8 << 8) | T_U64:
  case (T_U16 << 8) | T_S32:
  case (T_U16 << 8) | T_S64:
  case (T_U16 << 8) | T_U32:
  case (T_U16 << 8) | T_U64:
  case (T_U32 << 8) | T_S64:
  case (T_U32 << 8) | T_U64:
    replace_cast(&value->value, O_ZERO_EXTEND, rtype);
    return rtype;
  case (T_S16 << 8) | T_U8:
  case (T_S32 << 8) | T_U8:
  case (T_S32 << 8) | T_U16:
  case (T_S64 << 8) | T_U8:
  case (T_S64 << 8) | T_U16:
  case (T_S64 << 8) | T_U32:
  case (T_U16 << 8) | T_U8:
  case (T_U32 << 8) | T_U8:
  case (T_U32 << 8) | T_U16:
  case (T_U64 << 8) | T_U8:
  case (T_U64 << 8) | T_U16:
  case (T_U64 << 8) | T_U32:
    replace_cast(&left->next, O_ZERO_EXTEND, ltype);
    return ltype;
  case (T_S8 << 8) | T_U16:
    replace_cast(&left->next, O_REINTERPRET, T_S16);
    replace_cast(&value->value, O_SIGN_EXTEND, T_S16);
    return T_S16;
  case (T_S8 << 8) | T_U32:
  case (T_S16 << 8) | T_U32:
    replace_cast(&left->next, O_REINTERPRET, T_S32);
    replace_cast(&value->value, O_SIGN_EXTEND, T_S32);
    return T_S32;
  case (T_S8 << 8) | T_U64:
  case (T_S16 << 8) | T_U64:
  case (T_S32 << 8) | T_U64:
    replace_cast(&left->next, O_REINTERPRET, T_S64);
    replace_cast(&value->value, O_SIGN_EXTEND, T_S64);
    return T_S64;
  case (T_S8 << 8) | T_U8:
  case (T_S16 << 8) | T_U16:
  case (T_S32 << 8) | T_U32:
  case (T_S64 << 8) | T_U64:
    replace_cast(&left->next, O_REINTERPRET, ltype);
    return ltype;
  case (T_U16 << 8) | T_S8:
    replace_cast(&left->next, O_SIGN_EXTEND, T_S16);
    replace_cast(&value->value, O_REINTERPRET, T_S16);
    return T_S16;
  case (T_U32 << 8) | T_S8:
  case (T_U32 << 8) | T_S16:
    replace_cast(&left->next, O_SIGN_EXTEND, T_S32);
    replace_cast(&value->value, O_REINTERPRET, T_S32);
    return T_S32;
  case (T_U64 << 8) | T_S8:
  case (T_U64 << 8) | T_S16:
  case (T_U64 << 8) | T_S32:
    replace_cast(&left->next, O_SIGN_EXTEND, T_S64);
    replace_cast(&value->value, O_REINTERPRET, T_S64);
    return T_S64;
  case (T_U8 << 8) | T_S8:
  case (T_U16 << 8) | T_S16:
  case (T_U32 << 8) | T_S32:
  case (T_U64 << 8) | T_S64:
    replace_cast(&value->value, O_REINTERPRET, rtype);
    return rtype;
  default:
    fail("unsupported types in bitwise binary operation", value);
  }
}

type_type binary_numeric_promotion(expression *value, bool allow_floats) {
  expression *left = value->value, *right = left->next;
  type_type ltype = left->type->type, rtype = right->type->type;

  // TODO: support common upcasting
  switch ((((uint8_t) ltype) << 8) | (uint8_t) rtype) {
  case (T_F32 << 8) | T_F64:
  case (T_F32 << 8) | T_F128:
  case (T_F64 << 8) | T_F128:
    if (!allow_floats) no_floats(value);
    replace_cast(&value->value, O_FLOAT_EXTEND, rtype);
    return rtype;
  case (T_F64 << 8) | T_F32:
  case (T_F128 << 8) | T_F32:
  case (T_F128 << 8) | T_F64:
    if (!allow_floats) no_floats(value);
    replace_cast(&left->next, O_FLOAT_EXTEND, ltype);
    return ltype;
  case (T_F32 << 8) | T_S8:
  case (T_F32 << 8) | T_S16:
  case (T_F32 << 8) | T_S32:
  case (T_F64 << 8) | T_S8:
  case (T_F64 << 8) | T_S16:
  case (T_F64 << 8) | T_S32:
  case (T_F64 << 8) | T_S64:
  case (T_F128 << 8) | T_S8:
  case (T_F128 << 8) | T_S16:
  case (T_F128 << 8) | T_S32:
  case (T_F128 << 8) | T_S64:
    if (!allow_floats) no_floats(value);
    replace_cast(&left->next, O_SIGNED_TO_FLOAT, ltype);
    return ltype;
  case (T_F32 << 8) | T_U8:
  case (T_F32 << 8) | T_U16:
  case (T_F32 << 8) | T_U32:
  case (T_F64 << 8) | T_U8:
  case (T_F64 << 8) | T_U16:
  case (T_F64 << 8) | T_U32:
  case (T_F64 << 8) | T_U64:
  case (T_F128 << 8) | T_U8:
  case (T_F128 << 8) | T_U16:
  case (T_F128 << 8) | T_U32:
  case (T_F128 << 8) | T_U64:
    if (!allow_floats) no_floats(value);
    replace_cast(&left->next, O_UNSIGNED_TO_FLOAT, ltype);
    return ltype;
  case (T_S8 << 8) | T_F32:
  case (T_S16 << 8) | T_F32:
  case (T_S32 << 8) | T_F32:
  case (T_S8 << 8) | T_F64:
  case (T_S16 << 8) | T_F64:
  case (T_S32 << 8) | T_F64:
  case (T_S64 << 8) | T_F64:
  case (T_S8 << 8) | T_F128:
  case (T_S16 << 8) | T_F128:
  case (T_S32 << 8) | T_F128:
  case (T_S64 << 8) | T_F128:
    if (!allow_floats) no_floats(value);
    replace_cast(&value->value, O_SIGNED_TO_FLOAT, rtype);
    return rtype;
  case (T_U8 << 8) | T_F32:
  case (T_U16 << 8) | T_F32:
  case (T_U32 << 8) | T_F32:
  case (T_U8 << 8) | T_F64:
  case (T_U16 << 8) | T_F64:
  case (T_U32 << 8) | T_F64:
  case (T_U64 << 8) | T_F64:
  case (T_U8 << 8) | T_F128:
  case (T_U16 << 8) | T_F128:
  case (T_U32 << 8) | T_F128:
  case (T_U64 << 8) | T_F128:
    if (!allow_floats) no_floats(value);
    replace_cast(&value->value, O_UNSIGNED_TO_FLOAT, rtype);
    return rtype;
  case (T_F32 << 8) | T_S64:
    if (!allow_floats) no_floats(value);
    replace_cast(&left->next, O_SIGNED_TO_FLOAT, T_F64);
    replace_cast(&value->value, O_FLOAT_EXTEND, T_F64);
    return T_F64;
  case (T_F32 << 8) | T_U64:
    if (!allow_floats) no_floats(value);
    replace_cast(&left->next, O_UNSIGNED_TO_FLOAT, T_F64);
    replace_cast(&value->value, O_FLOAT_EXTEND, T_F64);
    return T_F64;
  case (T_S64 << 8) | T_F32:
    if (!allow_floats) no_floats(value);
    replace_cast(&left->next, O_FLOAT_EXTEND, T_F64);
    replace_cast(&value->value, O_SIGNED_TO_FLOAT, T_F64);
    return T_F64;
  case (T_U64 << 8) | T_F32:
    if (!allow_floats) no_floats(value);
    replace_cast(&left->next, O_FLOAT_EXTEND, T_F64);
    replace_cast(&value->value, O_UNSIGNED_TO_FLOAT, T_F64);
    return T_F64;
  case (T_F128 << 8) | T_F128:
  case (T_F64 << 8) | T_F64:
  case (T_F32 << 8) | T_F32:
    if (!allow_floats) no_floats(value);
    // fallthrough
  case (T_S32 << 8) | T_S32:
  case (T_S64 << 8) | T_S64:
  case (T_U32 << 8) | T_U32:
  case (T_U64 << 8) | T_U64:
    // no casting necessary!
    return ltype;
  case (T_S8 << 8) | T_S8:
  case (T_S8 << 8) | T_S16:
  case (T_S16 << 8) | T_S8:
  case (T_S16 << 8) | T_S16:
    replace_cast(&left->next, O_SIGN_EXTEND, T_S32);
    replace_cast(&value->value, O_SIGN_EXTEND, T_S32);
    return T_S32;
  case (T_S8 << 8) | T_U8:
  case (T_S8 << 8) | T_U16:
  case (T_S16 << 8) | T_U8:
  case (T_S16 << 8) | T_U16:
    replace_cast(&left->next, O_ZERO_EXTEND, T_S32);
    replace_cast(&value->value, O_SIGN_EXTEND, T_S32);
    return T_S32;
  case (T_U8 << 8) | T_S8:
  case (T_U8 << 8) | T_S16:
  case (T_U16 << 8) | T_S8:
  case (T_U16 << 8) | T_S16:
    replace_cast(&left->next, O_SIGN_EXTEND, T_S32);
    replace_cast(&value->value, O_ZERO_EXTEND, T_S32);
    return T_S32;
  case (T_S8 << 8) | T_S32:
  case (T_S8 << 8) | T_S64:
  case (T_S16 << 8) | T_S32:
  case (T_S16 << 8) | T_S64:
  case (T_S32 << 8) | T_S64:
    replace_cast(&value->value, O_SIGN_EXTEND, rtype);
    return rtype;
  case (T_S32 << 8) | T_S8:
  case (T_S32 << 8) | T_S16:
  case (T_S64 << 8) | T_S8:
  case (T_S64 << 8) | T_S16:
  case (T_S64 << 8) | T_S32:
    replace_cast(&left->next, O_SIGN_EXTEND, ltype);
    return ltype;
  case (T_U8 << 8) | T_U8:
  case (T_U8 << 8) | T_U16:
  case (T_U16 << 8) | T_U8:
  case (T_U16 << 8) | T_U16:
    replace_cast(&left->next, O_ZERO_EXTEND, T_U32);
    replace_cast(&value->value, O_ZERO_EXTEND, T_U32);
    return T_U32;
  case (T_U8 << 8) | T_S32:
  case (T_U8 << 8) | T_S64:
  case (T_U8 << 8) | T_U32:
  case (T_U8 << 8) | T_U64:
  case (T_U16 << 8) | T_S32:
  case (T_U16 << 8) | T_S64:
  case (T_U16 << 8) | T_U32:
  case (T_U16 << 8) | T_U64:
  case (T_U32 << 8) | T_S64:
  case (T_U32 << 8) | T_U64:
    replace_cast(&value->value, O_ZERO_EXTEND, rtype);
    return rtype;
  case (T_S32 << 8) | T_U8:
  case (T_S32 << 8) | T_U16:
  case (T_S64 << 8) | T_U8:
  case (T_S64 << 8) | T_U16:
  case (T_S64 << 8) | T_U32:
  case (T_U32 << 8) | T_U8:
  case (T_U32 << 8) | T_U16:
  case (T_U64 << 8) | T_U8:
  case (T_U64 << 8) | T_U16:
  case (T_U64 << 8) | T_U32:
    replace_cast(&left->next, O_ZERO_EXTEND, ltype);
    return ltype;
  case (T_S8 << 8) | T_U32:
  case (T_S16 << 8) | T_U32:
    replace_cast(&left->next, O_REINTERPRET, T_S32);
    replace_cast(&value->value, O_SIGN_EXTEND, T_S32);
    return T_S32;
  case (T_S8 << 8) | T_U64:
  case (T_S16 << 8) | T_U64:
  case (T_S32 << 8) | T_U64:
    replace_cast(&left->next, O_REINTERPRET, T_S64);
    replace_cast(&value->value, O_SIGN_EXTEND, T_S64);
    return T_S64;
  case (T_S32 << 8) | T_U32:
  case (T_S64 << 8) | T_U64:
    replace_cast(&left->next, O_REINTERPRET, ltype);
    return ltype;
  case (T_U32 << 8) | T_S8:
  case (T_U32 << 8) | T_S16:
    replace_cast(&left->next, O_SIGN_EXTEND, T_S32);
    replace_cast(&value->value, O_REINTERPRET, T_S32);
    return T_S32;
  case (T_U64 << 8) | T_S8:
  case (T_U64 << 8) | T_S16:
  case (T_U64 << 8) | T_S32:
    replace_cast(&left->next, O_SIGN_EXTEND, T_S64);
    replace_cast(&value->value, O_REINTERPRET, T_S64);
    return T_S64;
  case (T_U32 << 8) | T_S32:
  case (T_U64 << 8) | T_S64:
    replace_cast(&value->value, O_REINTERPRET, rtype);
    return rtype;
  case (T_STRING << 8) | T_OBJECT:
    if (right->operation.type == O_LITERAL) {
      return ltype;
    }
    // fallthrough
  default:
    fail("unsupported types in binary operation", value);
  }
}

void ternary_numeric_promotion(expression *value) {
  expression *cond = value->value, *left = cond->next, *right = left->next;
  type_type ltype = left->type->type, rtype = right->type->type, ftype;

  switch ((((uint8_t) ltype) << 8) | (uint8_t) rtype) {
  case (T_OBJECT << 8) | T_OBJECT:
    if (!left->type->classtype) {
      value->type = copy_type(right->type);
      return;
    }
    if (!right->type->classtype) {
      value->type = copy_type(left->type);
      return;
    }
    // fallthrough
  case (T_ARRAY << 8) | T_ARRAY:
  case (T_BLOCKREF << 8) | T_BLOCKREF:
    if (equivalent_type(left->type, right->type)) {
      value->type = copy_type(left->type);
      return;
    }
    goto unsupported;
  case (T_F32 << 8) | T_F64:
  case (T_F32 << 8) | T_F128:
  case (T_F64 << 8) | T_F128:
    replace_cast(&cond->next, O_FLOAT_EXTEND, rtype);
    ftype = rtype;
    break;
  case (T_F64 << 8) | T_F32:
  case (T_F128 << 8) | T_F32:
  case (T_F128 << 8) | T_F64:
    replace_cast(&left->next, O_FLOAT_EXTEND, ltype);
    ftype = ltype;
    break;
  case (T_F32 << 8) | T_S8:
  case (T_F32 << 8) | T_S16:
  case (T_F32 << 8) | T_S32:
  case (T_F64 << 8) | T_S8:
  case (T_F64 << 8) | T_S16:
  case (T_F64 << 8) | T_S32:
  case (T_F64 << 8) | T_S64:
  case (T_F128 << 8) | T_S8:
  case (T_F128 << 8) | T_S16:
  case (T_F128 << 8) | T_S32:
  case (T_F128 << 8) | T_S64:
    replace_cast(&left->next, O_SIGNED_TO_FLOAT, ltype);
    ftype = ltype;
    break;
  case (T_F32 << 8) | T_U8:
  case (T_F32 << 8) | T_U16:
  case (T_F32 << 8) | T_U32:
  case (T_F64 << 8) | T_U8:
  case (T_F64 << 8) | T_U16:
  case (T_F64 << 8) | T_U32:
  case (T_F64 << 8) | T_U64:
  case (T_F128 << 8) | T_U8:
  case (T_F128 << 8) | T_U16:
  case (T_F128 << 8) | T_U32:
  case (T_F128 << 8) | T_U64:
    replace_cast(&left->next, O_UNSIGNED_TO_FLOAT, ltype);
    ftype = ltype;
    break;
  case (T_S8 << 8) | T_F32:
  case (T_S16 << 8) | T_F32:
  case (T_S32 << 8) | T_F32:
  case (T_S8 << 8) | T_F64:
  case (T_S16 << 8) | T_F64:
  case (T_S32 << 8) | T_F64:
  case (T_S64 << 8) | T_F64:
  case (T_S8 << 8) | T_F128:
  case (T_S16 << 8) | T_F128:
  case (T_S32 << 8) | T_F128:
  case (T_S64 << 8) | T_F128:
    replace_cast(&cond->next, O_SIGNED_TO_FLOAT, rtype);
    ftype = rtype;
    break;
  case (T_U8 << 8) | T_F32:
  case (T_U16 << 8) | T_F32:
  case (T_U32 << 8) | T_F32:
  case (T_U8 << 8) | T_F64:
  case (T_U16 << 8) | T_F64:
  case (T_U32 << 8) | T_F64:
  case (T_U64 << 8) | T_F64:
  case (T_U8 << 8) | T_F128:
  case (T_U16 << 8) | T_F128:
  case (T_U32 << 8) | T_F128:
  case (T_U64 << 8) | T_F128:
    replace_cast(&cond->next, O_UNSIGNED_TO_FLOAT, rtype);
    ftype = rtype;
    break;
  case (T_F32 << 8) | T_S64:
    replace_cast(&left->next, O_SIGNED_TO_FLOAT, T_F64);
    replace_cast(&cond->next, O_FLOAT_EXTEND, T_F64);
    ftype = T_F64;
    break;
  case (T_F32 << 8) | T_U64:
    replace_cast(&left->next, O_UNSIGNED_TO_FLOAT, T_F64);
    replace_cast(&cond->next, O_FLOAT_EXTEND, T_F64);
    ftype = T_F64;
    break;
  case (T_S64 << 8) | T_F32:
    replace_cast(&left->next, O_FLOAT_EXTEND, T_F64);
    replace_cast(&cond->next, O_SIGNED_TO_FLOAT, T_F64);
    ftype = T_F64;
    break;
  case (T_U64 << 8) | T_F32:
    replace_cast(&left->next, O_FLOAT_EXTEND, T_F64);
    replace_cast(&cond->next, O_UNSIGNED_TO_FLOAT, T_F64);
    ftype = T_F64;
    break;
  case (T_BOOL << 8) | T_BOOL:
  case (T_F128 << 8) | T_F128:
  case (T_F64 << 8) | T_F64:
  case (T_F32 << 8) | T_F32:
  case (T_STRING << 8) | T_STRING:
  case (T_S8 << 8) | T_S8:
  case (T_S16 << 8) | T_S16:
  case (T_S32 << 8) | T_S32:
  case (T_S64 << 8) | T_S64:
  case (T_U8 << 8) | T_U8:
  case (T_U16 << 8) | T_U16:
  case (T_U32 << 8) | T_U32:
  case (T_U64 << 8) | T_U64:
    // no casting necessary!
    ftype = ltype;
    break;
  case (T_STRING << 8) | T_OBJECT:
    if (right->operation.type != O_LITERAL) {
      goto unsupported;
    }
    ftype = ltype;
    break;
  case (T_OBJECT << 8) | T_STRING:
    if (left->operation.type != O_LITERAL) {
      goto unsupported;
    }
    ftype = rtype;
    break;
  case (T_S8 << 8) | T_S16:
  case (T_S8 << 8) | T_S32:
  case (T_S8 << 8) | T_S64:
  case (T_S16 << 8) | T_S32:
  case (T_S16 << 8) | T_S64:
  case (T_S32 << 8) | T_S64:
    replace_cast(&cond->next, O_SIGN_EXTEND, rtype);
    ftype = rtype;
    break;
  case (T_S16 << 8) | T_S8:
  case (T_S32 << 8) | T_S8:
  case (T_S32 << 8) | T_S16:
  case (T_S64 << 8) | T_S8:
  case (T_S64 << 8) | T_S16:
  case (T_S64 << 8) | T_S32:
    replace_cast(&left->next, O_SIGN_EXTEND, ltype);
    ftype = ltype;
    break;
  case (T_U8 << 8) | T_S16:
  case (T_U8 << 8) | T_S32:
  case (T_U8 << 8) | T_S64:
  case (T_U8 << 8) | T_U16:
  case (T_U8 << 8) | T_U32:
  case (T_U8 << 8) | T_U64:
  case (T_U16 << 8) | T_S32:
  case (T_U16 << 8) | T_S64:
  case (T_U16 << 8) | T_U32:
  case (T_U16 << 8) | T_U64:
  case (T_U32 << 8) | T_S64:
  case (T_U32 << 8) | T_U64:
    replace_cast(&cond->next, O_ZERO_EXTEND, rtype);
    ftype = rtype;
    break;
  case (T_S16 << 8) | T_U8:
  case (T_S32 << 8) | T_U8:
  case (T_S32 << 8) | T_U16:
  case (T_S64 << 8) | T_U8:
  case (T_S64 << 8) | T_U16:
  case (T_S64 << 8) | T_U32:
  case (T_U16 << 8) | T_U8:
  case (T_U32 << 8) | T_U8:
  case (T_U32 << 8) | T_U16:
  case (T_U64 << 8) | T_U8:
  case (T_U64 << 8) | T_U16:
  case (T_U64 << 8) | T_U32:
    replace_cast(&left->next, O_ZERO_EXTEND, ltype);
    ftype = ltype;
    break;
  case (T_S8 << 8) | T_U16:
    replace_cast(&left->next, O_REINTERPRET, T_S16);
    replace_cast(&cond->next, O_SIGN_EXTEND, T_S16);
    ftype = T_S16;
    break;
  case (T_S8 << 8) | T_U32:
  case (T_S16 << 8) | T_U32:
    replace_cast(&left->next, O_REINTERPRET, T_S32);
    replace_cast(&cond->next, O_SIGN_EXTEND, T_S32);
    ftype = T_S32;
    break;
  case (T_S8 << 8) | T_U64:
  case (T_S16 << 8) | T_U64:
  case (T_S32 << 8) | T_U64:
    replace_cast(&left->next, O_REINTERPRET, T_S64);
    replace_cast(&cond->next, O_SIGN_EXTEND, T_S64);
    ftype = T_S64;
    break;
  case (T_S8 << 8) | T_U8:
  case (T_S16 << 8) | T_U16:
  case (T_S32 << 8) | T_U32:
  case (T_S64 << 8) | T_U64:
    replace_cast(&left->next, O_REINTERPRET, ltype);
    ftype = ltype;
    break;
  case (T_U16 << 8) | T_S8:
    replace_cast(&left->next, O_SIGN_EXTEND, T_S16);
    replace_cast(&cond->next, O_REINTERPRET, T_S16);
    ftype = T_S16;
    break;
  case (T_U32 << 8) | T_S8:
  case (T_U32 << 8) | T_S16:
    replace_cast(&left->next, O_SIGN_EXTEND, T_S32);
    replace_cast(&cond->next, O_REINTERPRET, T_S32);
    ftype = T_S32;
    break;
  case (T_U64 << 8) | T_S8:
  case (T_U64 << 8) | T_S16:
  case (T_U64 << 8) | T_S32:
    replace_cast(&left->next, O_SIGN_EXTEND, T_S64);
    replace_cast(&cond->next, O_REINTERPRET, T_S64);
    ftype = T_S64;
    break;
  case (T_U8 << 8) | T_S8:
  case (T_U16 << 8) | T_S16:
  case (T_U32 << 8) | T_S32:
  case (T_U64 << 8) | T_S64:
    replace_cast(&cond->next, O_REINTERPRET, rtype);
    ftype = rtype;
    break;
  default:
    if (ltype == T_VOID || rtype == T_VOID) {
      value->type = new_type(T_VOID);
      return;
    }

    goto unsupported;
  }

  value->type = new_type(ftype);
  return;

unsupported:
  fail("unsupported types in ternary operation", value);
}

void assert_condition(expression *condition) {
  type *t = condition->type;
  if (t->type != T_BOOL && !is_integer(t)) {
    fail("invalid condition", condition);
  }
}

// mutates
type *resolve_type(block_statement *block, type *t) {
  // TODO: static types as properties (module support)
  switch (t->type) {
  case T_ARRAY:
    resolve_type(block, t->arraytype);
    break;
  case T_BLOCKREF:
    for (argument *arg = t->blocktype; arg; arg = arg->next) {
      resolve_type(block, arg->argument_type);
    }
    break;
  case T_REF:
  case T_OBJECT: {
    // any type stored in the type symbol chain should already be resolved
    uint8_t symbol_type = ST_TYPE;
    symbol_entry *entry = get_symbol(block, t->symbol_name, &symbol_type);

    if (entry == NULL) {
      fprintf(stderr, "undeclared symbol '%s'\n", t->symbol_name);
      exit(1);
    }

    free(t->symbol_name);

    copy_type_into(entry->type, t);
  } break;
  default:
    break;
  }
  return t;
}
