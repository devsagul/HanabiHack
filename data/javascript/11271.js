// Compiled by ClojureScript 1.7.145 {}
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(f){
if(typeof cljs.core.async.t_cljs$core$async38209 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async38209 = (function (fn_handler,f,meta38210){
this.fn_handler = fn_handler;
this.f = f;
this.meta38210 = meta38210;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async38209.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_38211,meta38210__$1){
var self__ = this;
var _38211__$1 = this;
return (new cljs.core.async.t_cljs$core$async38209(self__.fn_handler,self__.f,meta38210__$1));
});

cljs.core.async.t_cljs$core$async38209.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_38211){
var self__ = this;
var _38211__$1 = this;
return self__.meta38210;
});

cljs.core.async.t_cljs$core$async38209.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async38209.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async38209.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
});

cljs.core.async.t_cljs$core$async38209.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"fn-handler","fn-handler",648785851,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null)], null)))], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"meta38210","meta38210",-1159328961,null)], null);
});

cljs.core.async.t_cljs$core$async38209.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async38209.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async38209";

cljs.core.async.t_cljs$core$async38209.cljs$lang$ctorPrWriter = (function (this__29504__auto__,writer__29505__auto__,opt__29506__auto__){
return cljs.core._write.call(null,writer__29505__auto__,"cljs.core.async/t_cljs$core$async38209");
});

cljs.core.async.__GT_t_cljs$core$async38209 = (function cljs$core$async$fn_handler_$___GT_t_cljs$core$async38209(fn_handler__$1,f__$1,meta38210){
return (new cljs.core.async.t_cljs$core$async38209(fn_handler__$1,f__$1,meta38210));
});

}

return (new cljs.core.async.t_cljs$core$async38209(cljs$core$async$fn_handler,f,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer.call(null,n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if(!((buff == null))){
if((false) || (buff.cljs$core$async$impl$protocols$UnblockingBuffer$)){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var args38214 = [];
var len__29964__auto___38217 = arguments.length;
var i__29965__auto___38218 = (0);
while(true){
if((i__29965__auto___38218 < len__29964__auto___38217)){
args38214.push((arguments[i__29965__auto___38218]));

var G__38219 = (i__29965__auto___38218 + (1));
i__29965__auto___38218 = G__38219;
continue;
} else {
}
break;
}

var G__38216 = args38214.length;
switch (G__38216) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args38214.length)].join('')));

}
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.call(null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.call(null,buf_or_n,null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.call(null,buf_or_n,xform,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.call(null,buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("buffer must be supplied when transducer is"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,new cljs.core.Symbol(null,"buf-or-n","buf-or-n",-1646815050,null)))].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.call(null,((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer.call(null,buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
});

cljs.core.async.chan.cljs$lang$maxFixedArity = 3;
/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout.call(null,msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var args38221 = [];
var len__29964__auto___38224 = arguments.length;
var i__29965__auto___38225 = (0);
while(true){
if((i__29965__auto___38225 < len__29964__auto___38224)){
args38221.push((arguments[i__29965__auto___38225]));

var G__38226 = (i__29965__auto___38225 + (1));
i__29965__auto___38225 = G__38226;
continue;
} else {
}
break;
}

var G__38223 = args38221.length;
switch (G__38223) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args38221.length)].join('')));

}
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.call(null,port,fn1,true);
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(ret)){
var val_38228 = cljs.core.deref.call(null,ret);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,val_38228);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (val_38228,ret){
return (function (){
return fn1.call(null,val_38228);
});})(val_38228,ret))
);
}
} else {
}

return null;
});

cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3;
cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.call(null,cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn0 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn0 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var args38229 = [];
var len__29964__auto___38232 = arguments.length;
var i__29965__auto___38233 = (0);
while(true){
if((i__29965__auto___38233 < len__29964__auto___38232)){
args38229.push((arguments[i__29965__auto___38233]));

var G__38234 = (i__29965__auto___38233 + (1));
i__29965__auto___38233 = G__38234;
continue;
} else {
}
break;
}

var G__38231 = args38229.length;
switch (G__38231) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args38229.length)].join('')));

}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__4423__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__4423__auto__)){
var ret = temp__4423__auto__;
return cljs.core.deref.call(null,ret);
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.call(null,port,val,fn1,true);
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__4423__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(temp__4423__auto__)){
var retb = temp__4423__auto__;
var ret = cljs.core.deref.call(null,retb);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,ret);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (ret,retb,temp__4423__auto__){
return (function (){
return fn1.call(null,ret);
});})(ret,retb,temp__4423__auto__))
);
}

return ret;
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4;
cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_.call(null,port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__29809__auto___38236 = n;
var x_38237 = (0);
while(true){
if((x_38237 < n__29809__auto___38236)){
(a[x_38237] = (0));

var G__38238 = (x_38237 + (1));
x_38237 = G__38238;
continue;
} else {
}
break;
}

var i = (1);
while(true){
if(cljs.core._EQ_.call(null,i,n)){
return a;
} else {
var j = cljs.core.rand_int.call(null,i);
(a[i] = (a[j]));

(a[j] = i);

var G__38239 = (i + (1));
i = G__38239;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.call(null,true);
if(typeof cljs.core.async.t_cljs$core$async38243 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async38243 = (function (alt_flag,flag,meta38244){
this.alt_flag = alt_flag;
this.flag = flag;
this.meta38244 = meta38244;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async38243.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_38245,meta38244__$1){
var self__ = this;
var _38245__$1 = this;
return (new cljs.core.async.t_cljs$core$async38243(self__.alt_flag,self__.flag,meta38244__$1));
});})(flag))
;

cljs.core.async.t_cljs$core$async38243.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_38245){
var self__ = this;
var _38245__$1 = this;
return self__.meta38244;
});})(flag))
;

cljs.core.async.t_cljs$core$async38243.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async38243.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref.call(null,self__.flag);
});})(flag))
;

cljs.core.async.t_cljs$core$async38243.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.flag,null);

return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async38243.getBasis = ((function (flag){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-flag","alt-flag",-1794972754,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(cljs.core.PersistentVector.EMPTY))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta38244","meta38244",306363955,null)], null);
});})(flag))
;

cljs.core.async.t_cljs$core$async38243.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async38243.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async38243";

cljs.core.async.t_cljs$core$async38243.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__29504__auto__,writer__29505__auto__,opt__29506__auto__){
return cljs.core._write.call(null,writer__29505__auto__,"cljs.core.async/t_cljs$core$async38243");
});})(flag))
;

cljs.core.async.__GT_t_cljs$core$async38243 = ((function (flag){
return (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async38243(alt_flag__$1,flag__$1,meta38244){
return (new cljs.core.async.t_cljs$core$async38243(alt_flag__$1,flag__$1,meta38244));
});})(flag))
;

}

return (new cljs.core.async.t_cljs$core$async38243(cljs$core$async$alt_flag,flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if(typeof cljs.core.async.t_cljs$core$async38249 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async38249 = (function (alt_handler,flag,cb,meta38250){
this.alt_handler = alt_handler;
this.flag = flag;
this.cb = cb;
this.meta38250 = meta38250;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async38249.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_38251,meta38250__$1){
var self__ = this;
var _38251__$1 = this;
return (new cljs.core.async.t_cljs$core$async38249(self__.alt_handler,self__.flag,self__.cb,meta38250__$1));
});

cljs.core.async.t_cljs$core$async38249.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_38251){
var self__ = this;
var _38251__$1 = this;
return self__.meta38250;
});

cljs.core.async.t_cljs$core$async38249.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async38249.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});

cljs.core.async.t_cljs$core$async38249.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit.call(null,self__.flag);

return self__.cb;
});

cljs.core.async.t_cljs$core$async38249.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-handler","alt-handler",963786170,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null)], null)))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta38250","meta38250",-726773671,null)], null);
});

cljs.core.async.t_cljs$core$async38249.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async38249.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async38249";

cljs.core.async.t_cljs$core$async38249.cljs$lang$ctorPrWriter = (function (this__29504__auto__,writer__29505__auto__,opt__29506__auto__){
return cljs.core._write.call(null,writer__29505__auto__,"cljs.core.async/t_cljs$core$async38249");
});

cljs.core.async.__GT_t_cljs$core$async38249 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async38249(alt_handler__$1,flag__$1,cb__$1,meta38250){
return (new cljs.core.async.t_cljs$core$async38249(alt_handler__$1,flag__$1,cb__$1,meta38250));
});

}

return (new cljs.core.async.t_cljs$core$async38249(cljs$core$async$alt_handler,flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
var flag = cljs.core.async.alt_flag.call(null);
var n = cljs.core.count.call(null,ports);
var idxs = cljs.core.async.random_array.call(null,n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.call(null,ports,idx);
var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,(0)):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,(1));
return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__38252_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__38252_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__38253_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__38253_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__28906__auto__ = wport;
if(cljs.core.truth_(or__28906__auto__)){
return or__28906__auto__;
} else {
return port;
}
})()], null));
} else {
var G__38254 = (i + (1));
i = G__38254;
continue;
}
} else {
return null;
}
break;
}
})();
var or__28906__auto__ = ret;
if(cljs.core.truth_(or__28906__auto__)){
return or__28906__auto__;
} else {
if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__4425__auto__ = (function (){var and__28894__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);
if(cljs.core.truth_(and__28894__auto__)){
return cljs.core.async.impl.protocols.commit.call(null,flag);
} else {
return and__28894__auto__;
}
})();
if(cljs.core.truth_(temp__4425__auto__)){
var got = temp__4425__auto__;
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__29971__auto__ = [];
var len__29964__auto___38260 = arguments.length;
var i__29965__auto___38261 = (0);
while(true){
if((i__29965__auto___38261 < len__29964__auto___38260)){
args__29971__auto__.push((arguments[i__29965__auto___38261]));

var G__38262 = (i__29965__auto___38261 + (1));
i__29965__auto___38261 = G__38262;
continue;
} else {
}
break;
}

var argseq__29972__auto__ = ((((1) < args__29971__auto__.length))?(new cljs.core.IndexedSeq(args__29971__auto__.slice((1)),(0))):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__29972__auto__);
});

cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__38257){
var map__38258 = p__38257;
var map__38258__$1 = ((((!((map__38258 == null)))?((((map__38258.cljs$lang$protocol_mask$partition0$ & (64))) || (map__38258.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38258):map__38258);
var opts = map__38258__$1;
throw (new Error("alts! used not in (go ...) block"));
});

cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1);

cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq38255){
var G__38256 = cljs.core.first.call(null,seq38255);
var seq38255__$1 = cljs.core.next.call(null,seq38255);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__38256,seq38255__$1);
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var args38263 = [];
var len__29964__auto___38313 = arguments.length;
var i__29965__auto___38314 = (0);
while(true){
if((i__29965__auto___38314 < len__29964__auto___38313)){
args38263.push((arguments[i__29965__auto___38314]));

var G__38315 = (i__29965__auto___38314 + (1));
i__29965__auto___38314 = G__38315;
continue;
} else {
}
break;
}

var G__38265 = args38263.length;
switch (G__38265) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args38263.length)].join('')));

}
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.call(null,from,to,true);
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__32217__auto___38317 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32217__auto___38317){
return (function (){
var f__32218__auto__ = (function (){var switch__32152__auto__ = ((function (c__32217__auto___38317){
return (function (state_38289){
var state_val_38290 = (state_38289[(1)]);
if((state_val_38290 === (7))){
var inst_38285 = (state_38289[(2)]);
var state_38289__$1 = state_38289;
var statearr_38291_38318 = state_38289__$1;
(statearr_38291_38318[(2)] = inst_38285);

(statearr_38291_38318[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38290 === (1))){
var state_38289__$1 = state_38289;
var statearr_38292_38319 = state_38289__$1;
(statearr_38292_38319[(2)] = null);

(statearr_38292_38319[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38290 === (4))){
var inst_38268 = (state_38289[(7)]);
var inst_38268__$1 = (state_38289[(2)]);
var inst_38269 = (inst_38268__$1 == null);
var state_38289__$1 = (function (){var statearr_38293 = state_38289;
(statearr_38293[(7)] = inst_38268__$1);

return statearr_38293;
})();
if(cljs.core.truth_(inst_38269)){
var statearr_38294_38320 = state_38289__$1;
(statearr_38294_38320[(1)] = (5));

} else {
var statearr_38295_38321 = state_38289__$1;
(statearr_38295_38321[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38290 === (13))){
var state_38289__$1 = state_38289;
var statearr_38296_38322 = state_38289__$1;
(statearr_38296_38322[(2)] = null);

(statearr_38296_38322[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38290 === (6))){
var inst_38268 = (state_38289[(7)]);
var state_38289__$1 = state_38289;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_38289__$1,(11),to,inst_38268);
} else {
if((state_val_38290 === (3))){
var inst_38287 = (state_38289[(2)]);
var state_38289__$1 = state_38289;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_38289__$1,inst_38287);
} else {
if((state_val_38290 === (12))){
var state_38289__$1 = state_38289;
var statearr_38297_38323 = state_38289__$1;
(statearr_38297_38323[(2)] = null);

(statearr_38297_38323[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38290 === (2))){
var state_38289__$1 = state_38289;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38289__$1,(4),from);
} else {
if((state_val_38290 === (11))){
var inst_38278 = (state_38289[(2)]);
var state_38289__$1 = state_38289;
if(cljs.core.truth_(inst_38278)){
var statearr_38298_38324 = state_38289__$1;
(statearr_38298_38324[(1)] = (12));

} else {
var statearr_38299_38325 = state_38289__$1;
(statearr_38299_38325[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38290 === (9))){
var state_38289__$1 = state_38289;
var statearr_38300_38326 = state_38289__$1;
(statearr_38300_38326[(2)] = null);

(statearr_38300_38326[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38290 === (5))){
var state_38289__$1 = state_38289;
if(cljs.core.truth_(close_QMARK_)){
var statearr_38301_38327 = state_38289__$1;
(statearr_38301_38327[(1)] = (8));

} else {
var statearr_38302_38328 = state_38289__$1;
(statearr_38302_38328[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38290 === (14))){
var inst_38283 = (state_38289[(2)]);
var state_38289__$1 = state_38289;
var statearr_38303_38329 = state_38289__$1;
(statearr_38303_38329[(2)] = inst_38283);

(statearr_38303_38329[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38290 === (10))){
var inst_38275 = (state_38289[(2)]);
var state_38289__$1 = state_38289;
var statearr_38304_38330 = state_38289__$1;
(statearr_38304_38330[(2)] = inst_38275);

(statearr_38304_38330[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38290 === (8))){
var inst_38272 = cljs.core.async.close_BANG_.call(null,to);
var state_38289__$1 = state_38289;
var statearr_38305_38331 = state_38289__$1;
(statearr_38305_38331[(2)] = inst_38272);

(statearr_38305_38331[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__32217__auto___38317))
;
return ((function (switch__32152__auto__,c__32217__auto___38317){
return (function() {
var cljs$core$async$state_machine__32153__auto__ = null;
var cljs$core$async$state_machine__32153__auto____0 = (function (){
var statearr_38309 = [null,null,null,null,null,null,null,null];
(statearr_38309[(0)] = cljs$core$async$state_machine__32153__auto__);

(statearr_38309[(1)] = (1));

return statearr_38309;
});
var cljs$core$async$state_machine__32153__auto____1 = (function (state_38289){
while(true){
var ret_value__32154__auto__ = (function (){try{while(true){
var result__32155__auto__ = switch__32152__auto__.call(null,state_38289);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32155__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32155__auto__;
}
break;
}
}catch (e38310){if((e38310 instanceof Object)){
var ex__32156__auto__ = e38310;
var statearr_38311_38332 = state_38289;
(statearr_38311_38332[(5)] = ex__32156__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_38289);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e38310;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32154__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__38333 = state_38289;
state_38289 = G__38333;
continue;
} else {
return ret_value__32154__auto__;
}
break;
}
});
cljs$core$async$state_machine__32153__auto__ = function(state_38289){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__32153__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__32153__auto____1.call(this,state_38289);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__32153__auto____0;
cljs$core$async$state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__32153__auto____1;
return cljs$core$async$state_machine__32153__auto__;
})()
;})(switch__32152__auto__,c__32217__auto___38317))
})();
var state__32219__auto__ = (function (){var statearr_38312 = f__32218__auto__.call(null);
(statearr_38312[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32217__auto___38317);

return statearr_38312;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32219__auto__);
});})(c__32217__auto___38317))
);


return to;
});

cljs.core.async.pipe.cljs$lang$maxFixedArity = 3;
cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"pos?","pos?",-244377722,null),new cljs.core.Symbol(null,"n","n",-2092305744,null))))].join('')));
}

var jobs = cljs.core.async.chan.call(null,n);
var results = cljs.core.async.chan.call(null,n);
var process = ((function (jobs,results){
return (function (p__38517){
var vec__38518 = p__38517;
var v = cljs.core.nth.call(null,vec__38518,(0),null);
var p = cljs.core.nth.call(null,vec__38518,(1),null);
var job = vec__38518;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);
var c__32217__auto___38700 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32217__auto___38700,res,vec__38518,v,p,job,jobs,results){
return (function (){
var f__32218__auto__ = (function (){var switch__32152__auto__ = ((function (c__32217__auto___38700,res,vec__38518,v,p,job,jobs,results){
return (function (state_38523){
var state_val_38524 = (state_38523[(1)]);
if((state_val_38524 === (1))){
var state_38523__$1 = state_38523;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_38523__$1,(2),res,v);
} else {
if((state_val_38524 === (2))){
var inst_38520 = (state_38523[(2)]);
var inst_38521 = cljs.core.async.close_BANG_.call(null,res);
var state_38523__$1 = (function (){var statearr_38525 = state_38523;
(statearr_38525[(7)] = inst_38520);

return statearr_38525;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_38523__$1,inst_38521);
} else {
return null;
}
}
});})(c__32217__auto___38700,res,vec__38518,v,p,job,jobs,results))
;
return ((function (switch__32152__auto__,c__32217__auto___38700,res,vec__38518,v,p,job,jobs,results){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____0 = (function (){
var statearr_38529 = [null,null,null,null,null,null,null,null];
(statearr_38529[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__);

(statearr_38529[(1)] = (1));

return statearr_38529;
});
var cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____1 = (function (state_38523){
while(true){
var ret_value__32154__auto__ = (function (){try{while(true){
var result__32155__auto__ = switch__32152__auto__.call(null,state_38523);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32155__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32155__auto__;
}
break;
}
}catch (e38530){if((e38530 instanceof Object)){
var ex__32156__auto__ = e38530;
var statearr_38531_38701 = state_38523;
(statearr_38531_38701[(5)] = ex__32156__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_38523);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e38530;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32154__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__38702 = state_38523;
state_38523 = G__38702;
continue;
} else {
return ret_value__32154__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__ = function(state_38523){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____1.call(this,state_38523);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__;
})()
;})(switch__32152__auto__,c__32217__auto___38700,res,vec__38518,v,p,job,jobs,results))
})();
var state__32219__auto__ = (function (){var statearr_38532 = f__32218__auto__.call(null);
(statearr_38532[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32217__auto___38700);

return statearr_38532;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32219__auto__);
});})(c__32217__auto___38700,res,vec__38518,v,p,job,jobs,results))
);


cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results))
;
var async = ((function (jobs,results,process){
return (function (p__38533){
var vec__38534 = p__38533;
var v = cljs.core.nth.call(null,vec__38534,(0),null);
var p = cljs.core.nth.call(null,vec__38534,(1),null);
var job = vec__38534;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1));
xf.call(null,v,res);

cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results,process))
;
var n__29809__auto___38703 = n;
var __38704 = (0);
while(true){
if((__38704 < n__29809__auto___38703)){
var G__38535_38705 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__38535_38705) {
case "compute":
var c__32217__auto___38707 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__38704,c__32217__auto___38707,G__38535_38705,n__29809__auto___38703,jobs,results,process,async){
return (function (){
var f__32218__auto__ = (function (){var switch__32152__auto__ = ((function (__38704,c__32217__auto___38707,G__38535_38705,n__29809__auto___38703,jobs,results,process,async){
return (function (state_38548){
var state_val_38549 = (state_38548[(1)]);
if((state_val_38549 === (1))){
var state_38548__$1 = state_38548;
var statearr_38550_38708 = state_38548__$1;
(statearr_38550_38708[(2)] = null);

(statearr_38550_38708[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38549 === (2))){
var state_38548__$1 = state_38548;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38548__$1,(4),jobs);
} else {
if((state_val_38549 === (3))){
var inst_38546 = (state_38548[(2)]);
var state_38548__$1 = state_38548;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_38548__$1,inst_38546);
} else {
if((state_val_38549 === (4))){
var inst_38538 = (state_38548[(2)]);
var inst_38539 = process.call(null,inst_38538);
var state_38548__$1 = state_38548;
if(cljs.core.truth_(inst_38539)){
var statearr_38551_38709 = state_38548__$1;
(statearr_38551_38709[(1)] = (5));

} else {
var statearr_38552_38710 = state_38548__$1;
(statearr_38552_38710[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38549 === (5))){
var state_38548__$1 = state_38548;
var statearr_38553_38711 = state_38548__$1;
(statearr_38553_38711[(2)] = null);

(statearr_38553_38711[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38549 === (6))){
var state_38548__$1 = state_38548;
var statearr_38554_38712 = state_38548__$1;
(statearr_38554_38712[(2)] = null);

(statearr_38554_38712[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38549 === (7))){
var inst_38544 = (state_38548[(2)]);
var state_38548__$1 = state_38548;
var statearr_38555_38713 = state_38548__$1;
(statearr_38555_38713[(2)] = inst_38544);

(statearr_38555_38713[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__38704,c__32217__auto___38707,G__38535_38705,n__29809__auto___38703,jobs,results,process,async))
;
return ((function (__38704,switch__32152__auto__,c__32217__auto___38707,G__38535_38705,n__29809__auto___38703,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____0 = (function (){
var statearr_38559 = [null,null,null,null,null,null,null];
(statearr_38559[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__);

(statearr_38559[(1)] = (1));

return statearr_38559;
});
var cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____1 = (function (state_38548){
while(true){
var ret_value__32154__auto__ = (function (){try{while(true){
var result__32155__auto__ = switch__32152__auto__.call(null,state_38548);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32155__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32155__auto__;
}
break;
}
}catch (e38560){if((e38560 instanceof Object)){
var ex__32156__auto__ = e38560;
var statearr_38561_38714 = state_38548;
(statearr_38561_38714[(5)] = ex__32156__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_38548);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e38560;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32154__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__38715 = state_38548;
state_38548 = G__38715;
continue;
} else {
return ret_value__32154__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__ = function(state_38548){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____1.call(this,state_38548);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__;
})()
;})(__38704,switch__32152__auto__,c__32217__auto___38707,G__38535_38705,n__29809__auto___38703,jobs,results,process,async))
})();
var state__32219__auto__ = (function (){var statearr_38562 = f__32218__auto__.call(null);
(statearr_38562[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32217__auto___38707);

return statearr_38562;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32219__auto__);
});})(__38704,c__32217__auto___38707,G__38535_38705,n__29809__auto___38703,jobs,results,process,async))
);


break;
case "async":
var c__32217__auto___38716 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__38704,c__32217__auto___38716,G__38535_38705,n__29809__auto___38703,jobs,results,process,async){
return (function (){
var f__32218__auto__ = (function (){var switch__32152__auto__ = ((function (__38704,c__32217__auto___38716,G__38535_38705,n__29809__auto___38703,jobs,results,process,async){
return (function (state_38575){
var state_val_38576 = (state_38575[(1)]);
if((state_val_38576 === (1))){
var state_38575__$1 = state_38575;
var statearr_38577_38717 = state_38575__$1;
(statearr_38577_38717[(2)] = null);

(statearr_38577_38717[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38576 === (2))){
var state_38575__$1 = state_38575;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38575__$1,(4),jobs);
} else {
if((state_val_38576 === (3))){
var inst_38573 = (state_38575[(2)]);
var state_38575__$1 = state_38575;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_38575__$1,inst_38573);
} else {
if((state_val_38576 === (4))){
var inst_38565 = (state_38575[(2)]);
var inst_38566 = async.call(null,inst_38565);
var state_38575__$1 = state_38575;
if(cljs.core.truth_(inst_38566)){
var statearr_38578_38718 = state_38575__$1;
(statearr_38578_38718[(1)] = (5));

} else {
var statearr_38579_38719 = state_38575__$1;
(statearr_38579_38719[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38576 === (5))){
var state_38575__$1 = state_38575;
var statearr_38580_38720 = state_38575__$1;
(statearr_38580_38720[(2)] = null);

(statearr_38580_38720[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38576 === (6))){
var state_38575__$1 = state_38575;
var statearr_38581_38721 = state_38575__$1;
(statearr_38581_38721[(2)] = null);

(statearr_38581_38721[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38576 === (7))){
var inst_38571 = (state_38575[(2)]);
var state_38575__$1 = state_38575;
var statearr_38582_38722 = state_38575__$1;
(statearr_38582_38722[(2)] = inst_38571);

(statearr_38582_38722[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__38704,c__32217__auto___38716,G__38535_38705,n__29809__auto___38703,jobs,results,process,async))
;
return ((function (__38704,switch__32152__auto__,c__32217__auto___38716,G__38535_38705,n__29809__auto___38703,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____0 = (function (){
var statearr_38586 = [null,null,null,null,null,null,null];
(statearr_38586[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__);

(statearr_38586[(1)] = (1));

return statearr_38586;
});
var cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____1 = (function (state_38575){
while(true){
var ret_value__32154__auto__ = (function (){try{while(true){
var result__32155__auto__ = switch__32152__auto__.call(null,state_38575);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32155__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32155__auto__;
}
break;
}
}catch (e38587){if((e38587 instanceof Object)){
var ex__32156__auto__ = e38587;
var statearr_38588_38723 = state_38575;
(statearr_38588_38723[(5)] = ex__32156__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_38575);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e38587;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32154__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__38724 = state_38575;
state_38575 = G__38724;
continue;
} else {
return ret_value__32154__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__ = function(state_38575){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____1.call(this,state_38575);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__;
})()
;})(__38704,switch__32152__auto__,c__32217__auto___38716,G__38535_38705,n__29809__auto___38703,jobs,results,process,async))
})();
var state__32219__auto__ = (function (){var statearr_38589 = f__32218__auto__.call(null);
(statearr_38589[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32217__auto___38716);

return statearr_38589;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32219__auto__);
});})(__38704,c__32217__auto___38716,G__38535_38705,n__29809__auto___38703,jobs,results,process,async))
);


break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(type)].join('')));

}

var G__38725 = (__38704 + (1));
__38704 = G__38725;
continue;
} else {
}
break;
}

var c__32217__auto___38726 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32217__auto___38726,jobs,results,process,async){
return (function (){
var f__32218__auto__ = (function (){var switch__32152__auto__ = ((function (c__32217__auto___38726,jobs,results,process,async){
return (function (state_38611){
var state_val_38612 = (state_38611[(1)]);
if((state_val_38612 === (1))){
var state_38611__$1 = state_38611;
var statearr_38613_38727 = state_38611__$1;
(statearr_38613_38727[(2)] = null);

(statearr_38613_38727[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38612 === (2))){
var state_38611__$1 = state_38611;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38611__$1,(4),from);
} else {
if((state_val_38612 === (3))){
var inst_38609 = (state_38611[(2)]);
var state_38611__$1 = state_38611;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_38611__$1,inst_38609);
} else {
if((state_val_38612 === (4))){
var inst_38592 = (state_38611[(7)]);
var inst_38592__$1 = (state_38611[(2)]);
var inst_38593 = (inst_38592__$1 == null);
var state_38611__$1 = (function (){var statearr_38614 = state_38611;
(statearr_38614[(7)] = inst_38592__$1);

return statearr_38614;
})();
if(cljs.core.truth_(inst_38593)){
var statearr_38615_38728 = state_38611__$1;
(statearr_38615_38728[(1)] = (5));

} else {
var statearr_38616_38729 = state_38611__$1;
(statearr_38616_38729[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38612 === (5))){
var inst_38595 = cljs.core.async.close_BANG_.call(null,jobs);
var state_38611__$1 = state_38611;
var statearr_38617_38730 = state_38611__$1;
(statearr_38617_38730[(2)] = inst_38595);

(statearr_38617_38730[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38612 === (6))){
var inst_38597 = (state_38611[(8)]);
var inst_38592 = (state_38611[(7)]);
var inst_38597__$1 = cljs.core.async.chan.call(null,(1));
var inst_38598 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_38599 = [inst_38592,inst_38597__$1];
var inst_38600 = (new cljs.core.PersistentVector(null,2,(5),inst_38598,inst_38599,null));
var state_38611__$1 = (function (){var statearr_38618 = state_38611;
(statearr_38618[(8)] = inst_38597__$1);

return statearr_38618;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_38611__$1,(8),jobs,inst_38600);
} else {
if((state_val_38612 === (7))){
var inst_38607 = (state_38611[(2)]);
var state_38611__$1 = state_38611;
var statearr_38619_38731 = state_38611__$1;
(statearr_38619_38731[(2)] = inst_38607);

(statearr_38619_38731[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38612 === (8))){
var inst_38597 = (state_38611[(8)]);
var inst_38602 = (state_38611[(2)]);
var state_38611__$1 = (function (){var statearr_38620 = state_38611;
(statearr_38620[(9)] = inst_38602);

return statearr_38620;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_38611__$1,(9),results,inst_38597);
} else {
if((state_val_38612 === (9))){
var inst_38604 = (state_38611[(2)]);
var state_38611__$1 = (function (){var statearr_38621 = state_38611;
(statearr_38621[(10)] = inst_38604);

return statearr_38621;
})();
var statearr_38622_38732 = state_38611__$1;
(statearr_38622_38732[(2)] = null);

(statearr_38622_38732[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
});})(c__32217__auto___38726,jobs,results,process,async))
;
return ((function (switch__32152__auto__,c__32217__auto___38726,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____0 = (function (){
var statearr_38626 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_38626[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__);

(statearr_38626[(1)] = (1));

return statearr_38626;
});
var cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____1 = (function (state_38611){
while(true){
var ret_value__32154__auto__ = (function (){try{while(true){
var result__32155__auto__ = switch__32152__auto__.call(null,state_38611);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32155__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32155__auto__;
}
break;
}
}catch (e38627){if((e38627 instanceof Object)){
var ex__32156__auto__ = e38627;
var statearr_38628_38733 = state_38611;
(statearr_38628_38733[(5)] = ex__32156__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_38611);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e38627;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32154__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__38734 = state_38611;
state_38611 = G__38734;
continue;
} else {
return ret_value__32154__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__ = function(state_38611){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____1.call(this,state_38611);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__;
})()
;})(switch__32152__auto__,c__32217__auto___38726,jobs,results,process,async))
})();
var state__32219__auto__ = (function (){var statearr_38629 = f__32218__auto__.call(null);
(statearr_38629[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32217__auto___38726);

return statearr_38629;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32219__auto__);
});})(c__32217__auto___38726,jobs,results,process,async))
);


var c__32217__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32217__auto__,jobs,results,process,async){
return (function (){
var f__32218__auto__ = (function (){var switch__32152__auto__ = ((function (c__32217__auto__,jobs,results,process,async){
return (function (state_38667){
var state_val_38668 = (state_38667[(1)]);
if((state_val_38668 === (7))){
var inst_38663 = (state_38667[(2)]);
var state_38667__$1 = state_38667;
var statearr_38669_38735 = state_38667__$1;
(statearr_38669_38735[(2)] = inst_38663);

(statearr_38669_38735[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38668 === (20))){
var state_38667__$1 = state_38667;
var statearr_38670_38736 = state_38667__$1;
(statearr_38670_38736[(2)] = null);

(statearr_38670_38736[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38668 === (1))){
var state_38667__$1 = state_38667;
var statearr_38671_38737 = state_38667__$1;
(statearr_38671_38737[(2)] = null);

(statearr_38671_38737[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38668 === (4))){
var inst_38632 = (state_38667[(7)]);
var inst_38632__$1 = (state_38667[(2)]);
var inst_38633 = (inst_38632__$1 == null);
var state_38667__$1 = (function (){var statearr_38672 = state_38667;
(statearr_38672[(7)] = inst_38632__$1);

return statearr_38672;
})();
if(cljs.core.truth_(inst_38633)){
var statearr_38673_38738 = state_38667__$1;
(statearr_38673_38738[(1)] = (5));

} else {
var statearr_38674_38739 = state_38667__$1;
(statearr_38674_38739[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38668 === (15))){
var inst_38645 = (state_38667[(8)]);
var state_38667__$1 = state_38667;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_38667__$1,(18),to,inst_38645);
} else {
if((state_val_38668 === (21))){
var inst_38658 = (state_38667[(2)]);
var state_38667__$1 = state_38667;
var statearr_38675_38740 = state_38667__$1;
(statearr_38675_38740[(2)] = inst_38658);

(statearr_38675_38740[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38668 === (13))){
var inst_38660 = (state_38667[(2)]);
var state_38667__$1 = (function (){var statearr_38676 = state_38667;
(statearr_38676[(9)] = inst_38660);

return statearr_38676;
})();
var statearr_38677_38741 = state_38667__$1;
(statearr_38677_38741[(2)] = null);

(statearr_38677_38741[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38668 === (6))){
var inst_38632 = (state_38667[(7)]);
var state_38667__$1 = state_38667;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38667__$1,(11),inst_38632);
} else {
if((state_val_38668 === (17))){
var inst_38653 = (state_38667[(2)]);
var state_38667__$1 = state_38667;
if(cljs.core.truth_(inst_38653)){
var statearr_38678_38742 = state_38667__$1;
(statearr_38678_38742[(1)] = (19));

} else {
var statearr_38679_38743 = state_38667__$1;
(statearr_38679_38743[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38668 === (3))){
var inst_38665 = (state_38667[(2)]);
var state_38667__$1 = state_38667;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_38667__$1,inst_38665);
} else {
if((state_val_38668 === (12))){
var inst_38642 = (state_38667[(10)]);
var state_38667__$1 = state_38667;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38667__$1,(14),inst_38642);
} else {
if((state_val_38668 === (2))){
var state_38667__$1 = state_38667;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38667__$1,(4),results);
} else {
if((state_val_38668 === (19))){
var state_38667__$1 = state_38667;
var statearr_38680_38744 = state_38667__$1;
(statearr_38680_38744[(2)] = null);

(statearr_38680_38744[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38668 === (11))){
var inst_38642 = (state_38667[(2)]);
var state_38667__$1 = (function (){var statearr_38681 = state_38667;
(statearr_38681[(10)] = inst_38642);

return statearr_38681;
})();
var statearr_38682_38745 = state_38667__$1;
(statearr_38682_38745[(2)] = null);

(statearr_38682_38745[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38668 === (9))){
var state_38667__$1 = state_38667;
var statearr_38683_38746 = state_38667__$1;
(statearr_38683_38746[(2)] = null);

(statearr_38683_38746[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38668 === (5))){
var state_38667__$1 = state_38667;
if(cljs.core.truth_(close_QMARK_)){
var statearr_38684_38747 = state_38667__$1;
(statearr_38684_38747[(1)] = (8));

} else {
var statearr_38685_38748 = state_38667__$1;
(statearr_38685_38748[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38668 === (14))){
var inst_38647 = (state_38667[(11)]);
var inst_38645 = (state_38667[(8)]);
var inst_38645__$1 = (state_38667[(2)]);
var inst_38646 = (inst_38645__$1 == null);
var inst_38647__$1 = cljs.core.not.call(null,inst_38646);
var state_38667__$1 = (function (){var statearr_38686 = state_38667;
(statearr_38686[(11)] = inst_38647__$1);

(statearr_38686[(8)] = inst_38645__$1);

return statearr_38686;
})();
if(inst_38647__$1){
var statearr_38687_38749 = state_38667__$1;
(statearr_38687_38749[(1)] = (15));

} else {
var statearr_38688_38750 = state_38667__$1;
(statearr_38688_38750[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38668 === (16))){
var inst_38647 = (state_38667[(11)]);
var state_38667__$1 = state_38667;
var statearr_38689_38751 = state_38667__$1;
(statearr_38689_38751[(2)] = inst_38647);

(statearr_38689_38751[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38668 === (10))){
var inst_38639 = (state_38667[(2)]);
var state_38667__$1 = state_38667;
var statearr_38690_38752 = state_38667__$1;
(statearr_38690_38752[(2)] = inst_38639);

(statearr_38690_38752[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38668 === (18))){
var inst_38650 = (state_38667[(2)]);
var state_38667__$1 = state_38667;
var statearr_38691_38753 = state_38667__$1;
(statearr_38691_38753[(2)] = inst_38650);

(statearr_38691_38753[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38668 === (8))){
var inst_38636 = cljs.core.async.close_BANG_.call(null,to);
var state_38667__$1 = state_38667;
var statearr_38692_38754 = state_38667__$1;
(statearr_38692_38754[(2)] = inst_38636);

(statearr_38692_38754[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__32217__auto__,jobs,results,process,async))
;
return ((function (switch__32152__auto__,c__32217__auto__,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____0 = (function (){
var statearr_38696 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_38696[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__);

(statearr_38696[(1)] = (1));

return statearr_38696;
});
var cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____1 = (function (state_38667){
while(true){
var ret_value__32154__auto__ = (function (){try{while(true){
var result__32155__auto__ = switch__32152__auto__.call(null,state_38667);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32155__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32155__auto__;
}
break;
}
}catch (e38697){if((e38697 instanceof Object)){
var ex__32156__auto__ = e38697;
var statearr_38698_38755 = state_38667;
(statearr_38698_38755[(5)] = ex__32156__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_38667);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e38697;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32154__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__38756 = state_38667;
state_38667 = G__38756;
continue;
} else {
return ret_value__32154__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__ = function(state_38667){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____1.call(this,state_38667);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__32153__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__32153__auto__;
})()
;})(switch__32152__auto__,c__32217__auto__,jobs,results,process,async))
})();
var state__32219__auto__ = (function (){var statearr_38699 = f__32218__auto__.call(null);
(statearr_38699[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32217__auto__);

return statearr_38699;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32219__auto__);
});})(c__32217__auto__,jobs,results,process,async))
);

return c__32217__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). af must close!
 *   the channel before returning.  The presumption is that af will
 *   return immediately, having launched some asynchronous operation
 *   whose completion/callback will manipulate the result channel. Outputs
 *   will be returned in order relative to  the inputs. By default, the to
 *   channel will be closed when the from channel closes, but can be
 *   determined by the close?  parameter. Will stop consuming the from
 *   channel if the to channel closes.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var args38757 = [];
var len__29964__auto___38760 = arguments.length;
var i__29965__auto___38761 = (0);
while(true){
if((i__29965__auto___38761 < len__29964__auto___38760)){
args38757.push((arguments[i__29965__auto___38761]));

var G__38762 = (i__29965__auto___38761 + (1));
i__29965__auto___38761 = G__38762;
continue;
} else {
}
break;
}

var G__38759 = args38757.length;
switch (G__38759) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args38757.length)].join('')));

}
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.call(null,n,to,af,from,true);
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_.call(null,n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
});

cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5;
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var args38764 = [];
var len__29964__auto___38767 = arguments.length;
var i__29965__auto___38768 = (0);
while(true){
if((i__29965__auto___38768 < len__29964__auto___38767)){
args38764.push((arguments[i__29965__auto___38768]));

var G__38769 = (i__29965__auto___38768 + (1));
i__29965__auto___38768 = G__38769;
continue;
} else {
}
break;
}

var G__38766 = args38764.length;
switch (G__38766) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args38764.length)].join('')));

}
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.call(null,n,to,xf,from,true);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.call(null,n,to,xf,from,close_QMARK_,null);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_.call(null,n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
});

cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6;
/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var args38771 = [];
var len__29964__auto___38824 = arguments.length;
var i__29965__auto___38825 = (0);
while(true){
if((i__29965__auto___38825 < len__29964__auto___38824)){
args38771.push((arguments[i__29965__auto___38825]));

var G__38826 = (i__29965__auto___38825 + (1));
i__29965__auto___38825 = G__38826;
continue;
} else {
}
break;
}

var G__38773 = args38771.length;
switch (G__38773) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args38771.length)].join('')));

}
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.call(null,p,ch,null,null);
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.call(null,t_buf_or_n);
var fc = cljs.core.async.chan.call(null,f_buf_or_n);
var c__32217__auto___38828 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32217__auto___38828,tc,fc){
return (function (){
var f__32218__auto__ = (function (){var switch__32152__auto__ = ((function (c__32217__auto___38828,tc,fc){
return (function (state_38799){
var state_val_38800 = (state_38799[(1)]);
if((state_val_38800 === (7))){
var inst_38795 = (state_38799[(2)]);
var state_38799__$1 = state_38799;
var statearr_38801_38829 = state_38799__$1;
(statearr_38801_38829[(2)] = inst_38795);

(statearr_38801_38829[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38800 === (1))){
var state_38799__$1 = state_38799;
var statearr_38802_38830 = state_38799__$1;
(statearr_38802_38830[(2)] = null);

(statearr_38802_38830[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38800 === (4))){
var inst_38776 = (state_38799[(7)]);
var inst_38776__$1 = (state_38799[(2)]);
var inst_38777 = (inst_38776__$1 == null);
var state_38799__$1 = (function (){var statearr_38803 = state_38799;
(statearr_38803[(7)] = inst_38776__$1);

return statearr_38803;
})();
if(cljs.core.truth_(inst_38777)){
var statearr_38804_38831 = state_38799__$1;
(statearr_38804_38831[(1)] = (5));

} else {
var statearr_38805_38832 = state_38799__$1;
(statearr_38805_38832[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38800 === (13))){
var state_38799__$1 = state_38799;
var statearr_38806_38833 = state_38799__$1;
(statearr_38806_38833[(2)] = null);

(statearr_38806_38833[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38800 === (6))){
var inst_38776 = (state_38799[(7)]);
var inst_38782 = p.call(null,inst_38776);
var state_38799__$1 = state_38799;
if(cljs.core.truth_(inst_38782)){
var statearr_38807_38834 = state_38799__$1;
(statearr_38807_38834[(1)] = (9));

} else {
var statearr_38808_38835 = state_38799__$1;
(statearr_38808_38835[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38800 === (3))){
var inst_38797 = (state_38799[(2)]);
var state_38799__$1 = state_38799;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_38799__$1,inst_38797);
} else {
if((state_val_38800 === (12))){
var state_38799__$1 = state_38799;
var statearr_38809_38836 = state_38799__$1;
(statearr_38809_38836[(2)] = null);

(statearr_38809_38836[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38800 === (2))){
var state_38799__$1 = state_38799;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38799__$1,(4),ch);
} else {
if((state_val_38800 === (11))){
var inst_38776 = (state_38799[(7)]);
var inst_38786 = (state_38799[(2)]);
var state_38799__$1 = state_38799;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_38799__$1,(8),inst_38786,inst_38776);
} else {
if((state_val_38800 === (9))){
var state_38799__$1 = state_38799;
var statearr_38810_38837 = state_38799__$1;
(statearr_38810_38837[(2)] = tc);

(statearr_38810_38837[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38800 === (5))){
var inst_38779 = cljs.core.async.close_BANG_.call(null,tc);
var inst_38780 = cljs.core.async.close_BANG_.call(null,fc);
var state_38799__$1 = (function (){var statearr_38811 = state_38799;
(statearr_38811[(8)] = inst_38779);

return statearr_38811;
})();
var statearr_38812_38838 = state_38799__$1;
(statearr_38812_38838[(2)] = inst_38780);

(statearr_38812_38838[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38800 === (14))){
var inst_38793 = (state_38799[(2)]);
var state_38799__$1 = state_38799;
var statearr_38813_38839 = state_38799__$1;
(statearr_38813_38839[(2)] = inst_38793);

(statearr_38813_38839[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38800 === (10))){
var state_38799__$1 = state_38799;
var statearr_38814_38840 = state_38799__$1;
(statearr_38814_38840[(2)] = fc);

(statearr_38814_38840[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38800 === (8))){
var inst_38788 = (state_38799[(2)]);
var state_38799__$1 = state_38799;
if(cljs.core.truth_(inst_38788)){
var statearr_38815_38841 = state_38799__$1;
(statearr_38815_38841[(1)] = (12));

} else {
var statearr_38816_38842 = state_38799__$1;
(statearr_38816_38842[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__32217__auto___38828,tc,fc))
;
return ((function (switch__32152__auto__,c__32217__auto___38828,tc,fc){
return (function() {
var cljs$core$async$state_machine__32153__auto__ = null;
var cljs$core$async$state_machine__32153__auto____0 = (function (){
var statearr_38820 = [null,null,null,null,null,null,null,null,null];
(statearr_38820[(0)] = cljs$core$async$state_machine__32153__auto__);

(statearr_38820[(1)] = (1));

return statearr_38820;
});
var cljs$core$async$state_machine__32153__auto____1 = (function (state_38799){
while(true){
var ret_value__32154__auto__ = (function (){try{while(true){
var result__32155__auto__ = switch__32152__auto__.call(null,state_38799);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32155__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32155__auto__;
}
break;
}
}catch (e38821){if((e38821 instanceof Object)){
var ex__32156__auto__ = e38821;
var statearr_38822_38843 = state_38799;
(statearr_38822_38843[(5)] = ex__32156__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_38799);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e38821;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32154__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__38844 = state_38799;
state_38799 = G__38844;
continue;
} else {
return ret_value__32154__auto__;
}
break;
}
});
cljs$core$async$state_machine__32153__auto__ = function(state_38799){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__32153__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__32153__auto____1.call(this,state_38799);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__32153__auto____0;
cljs$core$async$state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__32153__auto____1;
return cljs$core$async$state_machine__32153__auto__;
})()
;})(switch__32152__auto__,c__32217__auto___38828,tc,fc))
})();
var state__32219__auto__ = (function (){var statearr_38823 = f__32218__auto__.call(null);
(statearr_38823[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32217__auto___38828);

return statearr_38823;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32219__auto__);
});})(c__32217__auto___38828,tc,fc))
);


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
});

cljs.core.async.split.cljs$lang$maxFixedArity = 4;
/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__32217__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32217__auto__){
return (function (){
var f__32218__auto__ = (function (){var switch__32152__auto__ = ((function (c__32217__auto__){
return (function (state_38891){
var state_val_38892 = (state_38891[(1)]);
if((state_val_38892 === (1))){
var inst_38877 = init;
var state_38891__$1 = (function (){var statearr_38893 = state_38891;
(statearr_38893[(7)] = inst_38877);

return statearr_38893;
})();
var statearr_38894_38909 = state_38891__$1;
(statearr_38894_38909[(2)] = null);

(statearr_38894_38909[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38892 === (2))){
var state_38891__$1 = state_38891;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38891__$1,(4),ch);
} else {
if((state_val_38892 === (3))){
var inst_38889 = (state_38891[(2)]);
var state_38891__$1 = state_38891;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_38891__$1,inst_38889);
} else {
if((state_val_38892 === (4))){
var inst_38880 = (state_38891[(8)]);
var inst_38880__$1 = (state_38891[(2)]);
var inst_38881 = (inst_38880__$1 == null);
var state_38891__$1 = (function (){var statearr_38895 = state_38891;
(statearr_38895[(8)] = inst_38880__$1);

return statearr_38895;
})();
if(cljs.core.truth_(inst_38881)){
var statearr_38896_38910 = state_38891__$1;
(statearr_38896_38910[(1)] = (5));

} else {
var statearr_38897_38911 = state_38891__$1;
(statearr_38897_38911[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38892 === (5))){
var inst_38877 = (state_38891[(7)]);
var state_38891__$1 = state_38891;
var statearr_38898_38912 = state_38891__$1;
(statearr_38898_38912[(2)] = inst_38877);

(statearr_38898_38912[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38892 === (6))){
var inst_38880 = (state_38891[(8)]);
var inst_38877 = (state_38891[(7)]);
var inst_38884 = f.call(null,inst_38877,inst_38880);
var inst_38877__$1 = inst_38884;
var state_38891__$1 = (function (){var statearr_38899 = state_38891;
(statearr_38899[(7)] = inst_38877__$1);

return statearr_38899;
})();
var statearr_38900_38913 = state_38891__$1;
(statearr_38900_38913[(2)] = null);

(statearr_38900_38913[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38892 === (7))){
var inst_38887 = (state_38891[(2)]);
var state_38891__$1 = state_38891;
var statearr_38901_38914 = state_38891__$1;
(statearr_38901_38914[(2)] = inst_38887);

(statearr_38901_38914[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(c__32217__auto__))
;
return ((function (switch__32152__auto__,c__32217__auto__){
return (function() {
var cljs$core$async$reduce_$_state_machine__32153__auto__ = null;
var cljs$core$async$reduce_$_state_machine__32153__auto____0 = (function (){
var statearr_38905 = [null,null,null,null,null,null,null,null,null];
(statearr_38905[(0)] = cljs$core$async$reduce_$_state_machine__32153__auto__);

(statearr_38905[(1)] = (1));

return statearr_38905;
});
var cljs$core$async$reduce_$_state_machine__32153__auto____1 = (function (state_38891){
while(true){
var ret_value__32154__auto__ = (function (){try{while(true){
var result__32155__auto__ = switch__32152__auto__.call(null,state_38891);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32155__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32155__auto__;
}
break;
}
}catch (e38906){if((e38906 instanceof Object)){
var ex__32156__auto__ = e38906;
var statearr_38907_38915 = state_38891;
(statearr_38907_38915[(5)] = ex__32156__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_38891);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e38906;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32154__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__38916 = state_38891;
state_38891 = G__38916;
continue;
} else {
return ret_value__32154__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__32153__auto__ = function(state_38891){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__32153__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__32153__auto____1.call(this,state_38891);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__32153__auto____0;
cljs$core$async$reduce_$_state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__32153__auto____1;
return cljs$core$async$reduce_$_state_machine__32153__auto__;
})()
;})(switch__32152__auto__,c__32217__auto__))
})();
var state__32219__auto__ = (function (){var statearr_38908 = f__32218__auto__.call(null);
(statearr_38908[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32217__auto__);

return statearr_38908;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32219__auto__);
});})(c__32217__auto__))
);

return c__32217__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var args38917 = [];
var len__29964__auto___38969 = arguments.length;
var i__29965__auto___38970 = (0);
while(true){
if((i__29965__auto___38970 < len__29964__auto___38969)){
args38917.push((arguments[i__29965__auto___38970]));

var G__38971 = (i__29965__auto___38970 + (1));
i__29965__auto___38970 = G__38971;
continue;
} else {
}
break;
}

var G__38919 = args38917.length;
switch (G__38919) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args38917.length)].join('')));

}
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan.call(null,ch,coll,true);
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__32217__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32217__auto__){
return (function (){
var f__32218__auto__ = (function (){var switch__32152__auto__ = ((function (c__32217__auto__){
return (function (state_38944){
var state_val_38945 = (state_38944[(1)]);
if((state_val_38945 === (7))){
var inst_38926 = (state_38944[(2)]);
var state_38944__$1 = state_38944;
var statearr_38946_38973 = state_38944__$1;
(statearr_38946_38973[(2)] = inst_38926);

(statearr_38946_38973[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38945 === (1))){
var inst_38920 = cljs.core.seq.call(null,coll);
var inst_38921 = inst_38920;
var state_38944__$1 = (function (){var statearr_38947 = state_38944;
(statearr_38947[(7)] = inst_38921);

return statearr_38947;
})();
var statearr_38948_38974 = state_38944__$1;
(statearr_38948_38974[(2)] = null);

(statearr_38948_38974[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38945 === (4))){
var inst_38921 = (state_38944[(7)]);
var inst_38924 = cljs.core.first.call(null,inst_38921);
var state_38944__$1 = state_38944;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_38944__$1,(7),ch,inst_38924);
} else {
if((state_val_38945 === (13))){
var inst_38938 = (state_38944[(2)]);
var state_38944__$1 = state_38944;
var statearr_38949_38975 = state_38944__$1;
(statearr_38949_38975[(2)] = inst_38938);

(statearr_38949_38975[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38945 === (6))){
var inst_38929 = (state_38944[(2)]);
var state_38944__$1 = state_38944;
if(cljs.core.truth_(inst_38929)){
var statearr_38950_38976 = state_38944__$1;
(statearr_38950_38976[(1)] = (8));

} else {
var statearr_38951_38977 = state_38944__$1;
(statearr_38951_38977[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38945 === (3))){
var inst_38942 = (state_38944[(2)]);
var state_38944__$1 = state_38944;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_38944__$1,inst_38942);
} else {
if((state_val_38945 === (12))){
var state_38944__$1 = state_38944;
var statearr_38952_38978 = state_38944__$1;
(statearr_38952_38978[(2)] = null);

(statearr_38952_38978[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38945 === (2))){
var inst_38921 = (state_38944[(7)]);
var state_38944__$1 = state_38944;
if(cljs.core.truth_(inst_38921)){
var statearr_38953_38979 = state_38944__$1;
(statearr_38953_38979[(1)] = (4));

} else {
var statearr_38954_38980 = state_38944__$1;
(statearr_38954_38980[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38945 === (11))){
var inst_38935 = cljs.core.async.close_BANG_.call(null,ch);
var state_38944__$1 = state_38944;
var statearr_38955_38981 = state_38944__$1;
(statearr_38955_38981[(2)] = inst_38935);

(statearr_38955_38981[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38945 === (9))){
var state_38944__$1 = state_38944;
if(cljs.core.truth_(close_QMARK_)){
var statearr_38956_38982 = state_38944__$1;
(statearr_38956_38982[(1)] = (11));

} else {
var statearr_38957_38983 = state_38944__$1;
(statearr_38957_38983[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38945 === (5))){
var inst_38921 = (state_38944[(7)]);
var state_38944__$1 = state_38944;
var statearr_38958_38984 = state_38944__$1;
(statearr_38958_38984[(2)] = inst_38921);

(statearr_38958_38984[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38945 === (10))){
var inst_38940 = (state_38944[(2)]);
var state_38944__$1 = state_38944;
var statearr_38959_38985 = state_38944__$1;
(statearr_38959_38985[(2)] = inst_38940);

(statearr_38959_38985[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38945 === (8))){
var inst_38921 = (state_38944[(7)]);
var inst_38931 = cljs.core.next.call(null,inst_38921);
var inst_38921__$1 = inst_38931;
var state_38944__$1 = (function (){var statearr_38960 = state_38944;
(statearr_38960[(7)] = inst_38921__$1);

return statearr_38960;
})();
var statearr_38961_38986 = state_38944__$1;
(statearr_38961_38986[(2)] = null);

(statearr_38961_38986[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__32217__auto__))
;
return ((function (switch__32152__auto__,c__32217__auto__){
return (function() {
var cljs$core$async$state_machine__32153__auto__ = null;
var cljs$core$async$state_machine__32153__auto____0 = (function (){
var statearr_38965 = [null,null,null,null,null,null,null,null];
(statearr_38965[(0)] = cljs$core$async$state_machine__32153__auto__);

(statearr_38965[(1)] = (1));

return statearr_38965;
});
var cljs$core$async$state_machine__32153__auto____1 = (function (state_38944){
while(true){
var ret_value__32154__auto__ = (function (){try{while(true){
var result__32155__auto__ = switch__32152__auto__.call(null,state_38944);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32155__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32155__auto__;
}
break;
}
}catch (e38966){if((e38966 instanceof Object)){
var ex__32156__auto__ = e38966;
var statearr_38967_38987 = state_38944;
(statearr_38967_38987[(5)] = ex__32156__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_38944);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e38966;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32154__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__38988 = state_38944;
state_38944 = G__38988;
continue;
} else {
return ret_value__32154__auto__;
}
break;
}
});
cljs$core$async$state_machine__32153__auto__ = function(state_38944){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__32153__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__32153__auto____1.call(this,state_38944);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__32153__auto____0;
cljs$core$async$state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__32153__auto____1;
return cljs$core$async$state_machine__32153__auto__;
})()
;})(switch__32152__auto__,c__32217__auto__))
})();
var state__32219__auto__ = (function (){var statearr_38968 = f__32218__auto__.call(null);
(statearr_38968[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32217__auto__);

return statearr_38968;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32219__auto__);
});})(c__32217__auto__))
);

return c__32217__auto__;
});

cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3;
/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
var ch = cljs.core.async.chan.call(null,cljs.core.bounded_count.call(null,(100),coll));
cljs.core.async.onto_chan.call(null,ch,coll);

return ch;
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((!((_ == null))) && (!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
var x__29561__auto__ = (((_ == null))?null:_);
var m__29562__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__29561__auto__)]);
if(!((m__29562__auto__ == null))){
return m__29562__auto__.call(null,_);
} else {
var m__29562__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);
if(!((m__29562__auto____$1 == null))){
return m__29562__auto____$1.call(null,_);
} else {
throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((!((m == null))) && (!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
var x__29561__auto__ = (((m == null))?null:m);
var m__29562__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__29561__auto__)]);
if(!((m__29562__auto__ == null))){
return m__29562__auto__.call(null,m,ch,close_QMARK_);
} else {
var m__29562__auto____$1 = (cljs.core.async.tap_STAR_["_"]);
if(!((m__29562__auto____$1 == null))){
return m__29562__auto____$1.call(null,m,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
}
});

cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
var x__29561__auto__ = (((m == null))?null:m);
var m__29562__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__29561__auto__)]);
if(!((m__29562__auto__ == null))){
return m__29562__auto__.call(null,m,ch);
} else {
var m__29562__auto____$1 = (cljs.core.async.untap_STAR_["_"]);
if(!((m__29562__auto____$1 == null))){
return m__29562__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
}
});

cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
var x__29561__auto__ = (((m == null))?null:m);
var m__29562__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__29561__auto__)]);
if(!((m__29562__auto__ == null))){
return m__29562__auto__.call(null,m);
} else {
var m__29562__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);
if(!((m__29562__auto____$1 == null))){
return m__29562__auto____$1.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap-all*",m);
}
}
}
});

/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var m = (function (){
if(typeof cljs.core.async.t_cljs$core$async39210 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async39210 = (function (mult,ch,cs,meta39211){
this.mult = mult;
this.ch = ch;
this.cs = cs;
this.meta39211 = meta39211;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async39210.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_39212,meta39211__$1){
var self__ = this;
var _39212__$1 = this;
return (new cljs.core.async.t_cljs$core$async39210(self__.mult,self__.ch,self__.cs,meta39211__$1));
});})(cs))
;

cljs.core.async.t_cljs$core$async39210.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_39212){
var self__ = this;
var _39212__$1 = this;
return self__.meta39211;
});})(cs))
;

cljs.core.async.t_cljs$core$async39210.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async39210.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(cs))
;

cljs.core.async.t_cljs$core$async39210.prototype.cljs$core$async$Mult$ = true;

cljs.core.async.t_cljs$core$async39210.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async39210.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$1);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async39210.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async39210.getBasis = ((function (cs){
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"mult","mult",-1187640995,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mult(iple) of the supplied channel. Channels\n  containing copies of the channel can be created with 'tap', and\n  detached with 'untap'.\n\n  Each item is distributed to all taps in parallel and synchronously,\n  i.e. each tap must accept before the next item is distributed. Use\n  buffering/windowing to prevent slow taps from holding up the mult.\n\n  Items received when there are no taps get dropped.\n\n  If a tap puts to a closed channel, it will be removed from the mult."], null)),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta39211","meta39211",975021871,null)], null);
});})(cs))
;

cljs.core.async.t_cljs$core$async39210.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async39210.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async39210";

cljs.core.async.t_cljs$core$async39210.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__29504__auto__,writer__29505__auto__,opt__29506__auto__){
return cljs.core._write.call(null,writer__29505__auto__,"cljs.core.async/t_cljs$core$async39210");
});})(cs))
;

cljs.core.async.__GT_t_cljs$core$async39210 = ((function (cs){
return (function cljs$core$async$mult_$___GT_t_cljs$core$async39210(mult__$1,ch__$1,cs__$1,meta39211){
return (new cljs.core.async.t_cljs$core$async39210(mult__$1,ch__$1,cs__$1,meta39211));
});})(cs))
;

}

return (new cljs.core.async.t_cljs$core$async39210(cljs$core$async$mult,ch,cs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = ((function (cs,m,dchan,dctr){
return (function (_){
if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,true);
} else {
return null;
}
});})(cs,m,dchan,dctr))
;
var c__32217__auto___39431 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32217__auto___39431,cs,m,dchan,dctr,done){
return (function (){
var f__32218__auto__ = (function (){var switch__32152__auto__ = ((function (c__32217__auto___39431,cs,m,dchan,dctr,done){
return (function (state_39343){
var state_val_39344 = (state_39343[(1)]);
if((state_val_39344 === (7))){
var inst_39339 = (state_39343[(2)]);
var state_39343__$1 = state_39343;
var statearr_39345_39432 = state_39343__$1;
(statearr_39345_39432[(2)] = inst_39339);

(statearr_39345_39432[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (20))){
var inst_39244 = (state_39343[(7)]);
var inst_39254 = cljs.core.first.call(null,inst_39244);
var inst_39255 = cljs.core.nth.call(null,inst_39254,(0),null);
var inst_39256 = cljs.core.nth.call(null,inst_39254,(1),null);
var state_39343__$1 = (function (){var statearr_39346 = state_39343;
(statearr_39346[(8)] = inst_39255);

return statearr_39346;
})();
if(cljs.core.truth_(inst_39256)){
var statearr_39347_39433 = state_39343__$1;
(statearr_39347_39433[(1)] = (22));

} else {
var statearr_39348_39434 = state_39343__$1;
(statearr_39348_39434[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (27))){
var inst_39286 = (state_39343[(9)]);
var inst_39215 = (state_39343[(10)]);
var inst_39291 = (state_39343[(11)]);
var inst_39284 = (state_39343[(12)]);
var inst_39291__$1 = cljs.core._nth.call(null,inst_39284,inst_39286);
var inst_39292 = cljs.core.async.put_BANG_.call(null,inst_39291__$1,inst_39215,done);
var state_39343__$1 = (function (){var statearr_39349 = state_39343;
(statearr_39349[(11)] = inst_39291__$1);

return statearr_39349;
})();
if(cljs.core.truth_(inst_39292)){
var statearr_39350_39435 = state_39343__$1;
(statearr_39350_39435[(1)] = (30));

} else {
var statearr_39351_39436 = state_39343__$1;
(statearr_39351_39436[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (1))){
var state_39343__$1 = state_39343;
var statearr_39352_39437 = state_39343__$1;
(statearr_39352_39437[(2)] = null);

(statearr_39352_39437[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (24))){
var inst_39244 = (state_39343[(7)]);
var inst_39261 = (state_39343[(2)]);
var inst_39262 = cljs.core.next.call(null,inst_39244);
var inst_39224 = inst_39262;
var inst_39225 = null;
var inst_39226 = (0);
var inst_39227 = (0);
var state_39343__$1 = (function (){var statearr_39353 = state_39343;
(statearr_39353[(13)] = inst_39227);

(statearr_39353[(14)] = inst_39225);

(statearr_39353[(15)] = inst_39261);

(statearr_39353[(16)] = inst_39226);

(statearr_39353[(17)] = inst_39224);

return statearr_39353;
})();
var statearr_39354_39438 = state_39343__$1;
(statearr_39354_39438[(2)] = null);

(statearr_39354_39438[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (39))){
var state_39343__$1 = state_39343;
var statearr_39358_39439 = state_39343__$1;
(statearr_39358_39439[(2)] = null);

(statearr_39358_39439[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (4))){
var inst_39215 = (state_39343[(10)]);
var inst_39215__$1 = (state_39343[(2)]);
var inst_39216 = (inst_39215__$1 == null);
var state_39343__$1 = (function (){var statearr_39359 = state_39343;
(statearr_39359[(10)] = inst_39215__$1);

return statearr_39359;
})();
if(cljs.core.truth_(inst_39216)){
var statearr_39360_39440 = state_39343__$1;
(statearr_39360_39440[(1)] = (5));

} else {
var statearr_39361_39441 = state_39343__$1;
(statearr_39361_39441[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (15))){
var inst_39227 = (state_39343[(13)]);
var inst_39225 = (state_39343[(14)]);
var inst_39226 = (state_39343[(16)]);
var inst_39224 = (state_39343[(17)]);
var inst_39240 = (state_39343[(2)]);
var inst_39241 = (inst_39227 + (1));
var tmp39355 = inst_39225;
var tmp39356 = inst_39226;
var tmp39357 = inst_39224;
var inst_39224__$1 = tmp39357;
var inst_39225__$1 = tmp39355;
var inst_39226__$1 = tmp39356;
var inst_39227__$1 = inst_39241;
var state_39343__$1 = (function (){var statearr_39362 = state_39343;
(statearr_39362[(18)] = inst_39240);

(statearr_39362[(13)] = inst_39227__$1);

(statearr_39362[(14)] = inst_39225__$1);

(statearr_39362[(16)] = inst_39226__$1);

(statearr_39362[(17)] = inst_39224__$1);

return statearr_39362;
})();
var statearr_39363_39442 = state_39343__$1;
(statearr_39363_39442[(2)] = null);

(statearr_39363_39442[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (21))){
var inst_39265 = (state_39343[(2)]);
var state_39343__$1 = state_39343;
var statearr_39367_39443 = state_39343__$1;
(statearr_39367_39443[(2)] = inst_39265);

(statearr_39367_39443[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (31))){
var inst_39291 = (state_39343[(11)]);
var inst_39295 = done.call(null,null);
var inst_39296 = cljs.core.async.untap_STAR_.call(null,m,inst_39291);
var state_39343__$1 = (function (){var statearr_39368 = state_39343;
(statearr_39368[(19)] = inst_39295);

return statearr_39368;
})();
var statearr_39369_39444 = state_39343__$1;
(statearr_39369_39444[(2)] = inst_39296);

(statearr_39369_39444[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (32))){
var inst_39286 = (state_39343[(9)]);
var inst_39285 = (state_39343[(20)]);
var inst_39283 = (state_39343[(21)]);
var inst_39284 = (state_39343[(12)]);
var inst_39298 = (state_39343[(2)]);
var inst_39299 = (inst_39286 + (1));
var tmp39364 = inst_39285;
var tmp39365 = inst_39283;
var tmp39366 = inst_39284;
var inst_39283__$1 = tmp39365;
var inst_39284__$1 = tmp39366;
var inst_39285__$1 = tmp39364;
var inst_39286__$1 = inst_39299;
var state_39343__$1 = (function (){var statearr_39370 = state_39343;
(statearr_39370[(9)] = inst_39286__$1);

(statearr_39370[(20)] = inst_39285__$1);

(statearr_39370[(21)] = inst_39283__$1);

(statearr_39370[(22)] = inst_39298);

(statearr_39370[(12)] = inst_39284__$1);

return statearr_39370;
})();
var statearr_39371_39445 = state_39343__$1;
(statearr_39371_39445[(2)] = null);

(statearr_39371_39445[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (40))){
var inst_39311 = (state_39343[(23)]);
var inst_39315 = done.call(null,null);
var inst_39316 = cljs.core.async.untap_STAR_.call(null,m,inst_39311);
var state_39343__$1 = (function (){var statearr_39372 = state_39343;
(statearr_39372[(24)] = inst_39315);

return statearr_39372;
})();
var statearr_39373_39446 = state_39343__$1;
(statearr_39373_39446[(2)] = inst_39316);

(statearr_39373_39446[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (33))){
var inst_39302 = (state_39343[(25)]);
var inst_39304 = cljs.core.chunked_seq_QMARK_.call(null,inst_39302);
var state_39343__$1 = state_39343;
if(inst_39304){
var statearr_39374_39447 = state_39343__$1;
(statearr_39374_39447[(1)] = (36));

} else {
var statearr_39375_39448 = state_39343__$1;
(statearr_39375_39448[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (13))){
var inst_39234 = (state_39343[(26)]);
var inst_39237 = cljs.core.async.close_BANG_.call(null,inst_39234);
var state_39343__$1 = state_39343;
var statearr_39376_39449 = state_39343__$1;
(statearr_39376_39449[(2)] = inst_39237);

(statearr_39376_39449[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (22))){
var inst_39255 = (state_39343[(8)]);
var inst_39258 = cljs.core.async.close_BANG_.call(null,inst_39255);
var state_39343__$1 = state_39343;
var statearr_39377_39450 = state_39343__$1;
(statearr_39377_39450[(2)] = inst_39258);

(statearr_39377_39450[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (36))){
var inst_39302 = (state_39343[(25)]);
var inst_39306 = cljs.core.chunk_first.call(null,inst_39302);
var inst_39307 = cljs.core.chunk_rest.call(null,inst_39302);
var inst_39308 = cljs.core.count.call(null,inst_39306);
var inst_39283 = inst_39307;
var inst_39284 = inst_39306;
var inst_39285 = inst_39308;
var inst_39286 = (0);
var state_39343__$1 = (function (){var statearr_39378 = state_39343;
(statearr_39378[(9)] = inst_39286);

(statearr_39378[(20)] = inst_39285);

(statearr_39378[(21)] = inst_39283);

(statearr_39378[(12)] = inst_39284);

return statearr_39378;
})();
var statearr_39379_39451 = state_39343__$1;
(statearr_39379_39451[(2)] = null);

(statearr_39379_39451[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (41))){
var inst_39302 = (state_39343[(25)]);
var inst_39318 = (state_39343[(2)]);
var inst_39319 = cljs.core.next.call(null,inst_39302);
var inst_39283 = inst_39319;
var inst_39284 = null;
var inst_39285 = (0);
var inst_39286 = (0);
var state_39343__$1 = (function (){var statearr_39380 = state_39343;
(statearr_39380[(9)] = inst_39286);

(statearr_39380[(20)] = inst_39285);

(statearr_39380[(21)] = inst_39283);

(statearr_39380[(27)] = inst_39318);

(statearr_39380[(12)] = inst_39284);

return statearr_39380;
})();
var statearr_39381_39452 = state_39343__$1;
(statearr_39381_39452[(2)] = null);

(statearr_39381_39452[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (43))){
var state_39343__$1 = state_39343;
var statearr_39382_39453 = state_39343__$1;
(statearr_39382_39453[(2)] = null);

(statearr_39382_39453[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (29))){
var inst_39327 = (state_39343[(2)]);
var state_39343__$1 = state_39343;
var statearr_39383_39454 = state_39343__$1;
(statearr_39383_39454[(2)] = inst_39327);

(statearr_39383_39454[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (44))){
var inst_39336 = (state_39343[(2)]);
var state_39343__$1 = (function (){var statearr_39384 = state_39343;
(statearr_39384[(28)] = inst_39336);

return statearr_39384;
})();
var statearr_39385_39455 = state_39343__$1;
(statearr_39385_39455[(2)] = null);

(statearr_39385_39455[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (6))){
var inst_39275 = (state_39343[(29)]);
var inst_39274 = cljs.core.deref.call(null,cs);
var inst_39275__$1 = cljs.core.keys.call(null,inst_39274);
var inst_39276 = cljs.core.count.call(null,inst_39275__$1);
var inst_39277 = cljs.core.reset_BANG_.call(null,dctr,inst_39276);
var inst_39282 = cljs.core.seq.call(null,inst_39275__$1);
var inst_39283 = inst_39282;
var inst_39284 = null;
var inst_39285 = (0);
var inst_39286 = (0);
var state_39343__$1 = (function (){var statearr_39386 = state_39343;
(statearr_39386[(9)] = inst_39286);

(statearr_39386[(20)] = inst_39285);

(statearr_39386[(21)] = inst_39283);

(statearr_39386[(30)] = inst_39277);

(statearr_39386[(29)] = inst_39275__$1);

(statearr_39386[(12)] = inst_39284);

return statearr_39386;
})();
var statearr_39387_39456 = state_39343__$1;
(statearr_39387_39456[(2)] = null);

(statearr_39387_39456[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (28))){
var inst_39283 = (state_39343[(21)]);
var inst_39302 = (state_39343[(25)]);
var inst_39302__$1 = cljs.core.seq.call(null,inst_39283);
var state_39343__$1 = (function (){var statearr_39388 = state_39343;
(statearr_39388[(25)] = inst_39302__$1);

return statearr_39388;
})();
if(inst_39302__$1){
var statearr_39389_39457 = state_39343__$1;
(statearr_39389_39457[(1)] = (33));

} else {
var statearr_39390_39458 = state_39343__$1;
(statearr_39390_39458[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (25))){
var inst_39286 = (state_39343[(9)]);
var inst_39285 = (state_39343[(20)]);
var inst_39288 = (inst_39286 < inst_39285);
var inst_39289 = inst_39288;
var state_39343__$1 = state_39343;
if(cljs.core.truth_(inst_39289)){
var statearr_39391_39459 = state_39343__$1;
(statearr_39391_39459[(1)] = (27));

} else {
var statearr_39392_39460 = state_39343__$1;
(statearr_39392_39460[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (34))){
var state_39343__$1 = state_39343;
var statearr_39393_39461 = state_39343__$1;
(statearr_39393_39461[(2)] = null);

(statearr_39393_39461[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (17))){
var state_39343__$1 = state_39343;
var statearr_39394_39462 = state_39343__$1;
(statearr_39394_39462[(2)] = null);

(statearr_39394_39462[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (3))){
var inst_39341 = (state_39343[(2)]);
var state_39343__$1 = state_39343;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_39343__$1,inst_39341);
} else {
if((state_val_39344 === (12))){
var inst_39270 = (state_39343[(2)]);
var state_39343__$1 = state_39343;
var statearr_39395_39463 = state_39343__$1;
(statearr_39395_39463[(2)] = inst_39270);

(statearr_39395_39463[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (2))){
var state_39343__$1 = state_39343;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39343__$1,(4),ch);
} else {
if((state_val_39344 === (23))){
var state_39343__$1 = state_39343;
var statearr_39396_39464 = state_39343__$1;
(statearr_39396_39464[(2)] = null);

(statearr_39396_39464[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (35))){
var inst_39325 = (state_39343[(2)]);
var state_39343__$1 = state_39343;
var statearr_39397_39465 = state_39343__$1;
(statearr_39397_39465[(2)] = inst_39325);

(statearr_39397_39465[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (19))){
var inst_39244 = (state_39343[(7)]);
var inst_39248 = cljs.core.chunk_first.call(null,inst_39244);
var inst_39249 = cljs.core.chunk_rest.call(null,inst_39244);
var inst_39250 = cljs.core.count.call(null,inst_39248);
var inst_39224 = inst_39249;
var inst_39225 = inst_39248;
var inst_39226 = inst_39250;
var inst_39227 = (0);
var state_39343__$1 = (function (){var statearr_39398 = state_39343;
(statearr_39398[(13)] = inst_39227);

(statearr_39398[(14)] = inst_39225);

(statearr_39398[(16)] = inst_39226);

(statearr_39398[(17)] = inst_39224);

return statearr_39398;
})();
var statearr_39399_39466 = state_39343__$1;
(statearr_39399_39466[(2)] = null);

(statearr_39399_39466[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (11))){
var inst_39244 = (state_39343[(7)]);
var inst_39224 = (state_39343[(17)]);
var inst_39244__$1 = cljs.core.seq.call(null,inst_39224);
var state_39343__$1 = (function (){var statearr_39400 = state_39343;
(statearr_39400[(7)] = inst_39244__$1);

return statearr_39400;
})();
if(inst_39244__$1){
var statearr_39401_39467 = state_39343__$1;
(statearr_39401_39467[(1)] = (16));

} else {
var statearr_39402_39468 = state_39343__$1;
(statearr_39402_39468[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (9))){
var inst_39272 = (state_39343[(2)]);
var state_39343__$1 = state_39343;
var statearr_39403_39469 = state_39343__$1;
(statearr_39403_39469[(2)] = inst_39272);

(statearr_39403_39469[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (5))){
var inst_39222 = cljs.core.deref.call(null,cs);
var inst_39223 = cljs.core.seq.call(null,inst_39222);
var inst_39224 = inst_39223;
var inst_39225 = null;
var inst_39226 = (0);
var inst_39227 = (0);
var state_39343__$1 = (function (){var statearr_39404 = state_39343;
(statearr_39404[(13)] = inst_39227);

(statearr_39404[(14)] = inst_39225);

(statearr_39404[(16)] = inst_39226);

(statearr_39404[(17)] = inst_39224);

return statearr_39404;
})();
var statearr_39405_39470 = state_39343__$1;
(statearr_39405_39470[(2)] = null);

(statearr_39405_39470[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (14))){
var state_39343__$1 = state_39343;
var statearr_39406_39471 = state_39343__$1;
(statearr_39406_39471[(2)] = null);

(statearr_39406_39471[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (45))){
var inst_39333 = (state_39343[(2)]);
var state_39343__$1 = state_39343;
var statearr_39407_39472 = state_39343__$1;
(statearr_39407_39472[(2)] = inst_39333);

(statearr_39407_39472[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (26))){
var inst_39275 = (state_39343[(29)]);
var inst_39329 = (state_39343[(2)]);
var inst_39330 = cljs.core.seq.call(null,inst_39275);
var state_39343__$1 = (function (){var statearr_39408 = state_39343;
(statearr_39408[(31)] = inst_39329);

return statearr_39408;
})();
if(inst_39330){
var statearr_39409_39473 = state_39343__$1;
(statearr_39409_39473[(1)] = (42));

} else {
var statearr_39410_39474 = state_39343__$1;
(statearr_39410_39474[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (16))){
var inst_39244 = (state_39343[(7)]);
var inst_39246 = cljs.core.chunked_seq_QMARK_.call(null,inst_39244);
var state_39343__$1 = state_39343;
if(inst_39246){
var statearr_39411_39475 = state_39343__$1;
(statearr_39411_39475[(1)] = (19));

} else {
var statearr_39412_39476 = state_39343__$1;
(statearr_39412_39476[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (38))){
var inst_39322 = (state_39343[(2)]);
var state_39343__$1 = state_39343;
var statearr_39413_39477 = state_39343__$1;
(statearr_39413_39477[(2)] = inst_39322);

(statearr_39413_39477[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (30))){
var state_39343__$1 = state_39343;
var statearr_39414_39478 = state_39343__$1;
(statearr_39414_39478[(2)] = null);

(statearr_39414_39478[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (10))){
var inst_39227 = (state_39343[(13)]);
var inst_39225 = (state_39343[(14)]);
var inst_39233 = cljs.core._nth.call(null,inst_39225,inst_39227);
var inst_39234 = cljs.core.nth.call(null,inst_39233,(0),null);
var inst_39235 = cljs.core.nth.call(null,inst_39233,(1),null);
var state_39343__$1 = (function (){var statearr_39415 = state_39343;
(statearr_39415[(26)] = inst_39234);

return statearr_39415;
})();
if(cljs.core.truth_(inst_39235)){
var statearr_39416_39479 = state_39343__$1;
(statearr_39416_39479[(1)] = (13));

} else {
var statearr_39417_39480 = state_39343__$1;
(statearr_39417_39480[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (18))){
var inst_39268 = (state_39343[(2)]);
var state_39343__$1 = state_39343;
var statearr_39418_39481 = state_39343__$1;
(statearr_39418_39481[(2)] = inst_39268);

(statearr_39418_39481[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (42))){
var state_39343__$1 = state_39343;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39343__$1,(45),dchan);
} else {
if((state_val_39344 === (37))){
var inst_39215 = (state_39343[(10)]);
var inst_39311 = (state_39343[(23)]);
var inst_39302 = (state_39343[(25)]);
var inst_39311__$1 = cljs.core.first.call(null,inst_39302);
var inst_39312 = cljs.core.async.put_BANG_.call(null,inst_39311__$1,inst_39215,done);
var state_39343__$1 = (function (){var statearr_39419 = state_39343;
(statearr_39419[(23)] = inst_39311__$1);

return statearr_39419;
})();
if(cljs.core.truth_(inst_39312)){
var statearr_39420_39482 = state_39343__$1;
(statearr_39420_39482[(1)] = (39));

} else {
var statearr_39421_39483 = state_39343__$1;
(statearr_39421_39483[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39344 === (8))){
var inst_39227 = (state_39343[(13)]);
var inst_39226 = (state_39343[(16)]);
var inst_39229 = (inst_39227 < inst_39226);
var inst_39230 = inst_39229;
var state_39343__$1 = state_39343;
if(cljs.core.truth_(inst_39230)){
var statearr_39422_39484 = state_39343__$1;
(statearr_39422_39484[(1)] = (10));

} else {
var statearr_39423_39485 = state_39343__$1;
(statearr_39423_39485[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__32217__auto___39431,cs,m,dchan,dctr,done))
;
return ((function (switch__32152__auto__,c__32217__auto___39431,cs,m,dchan,dctr,done){
return (function() {
var cljs$core$async$mult_$_state_machine__32153__auto__ = null;
var cljs$core$async$mult_$_state_machine__32153__auto____0 = (function (){
var statearr_39427 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_39427[(0)] = cljs$core$async$mult_$_state_machine__32153__auto__);

(statearr_39427[(1)] = (1));

return statearr_39427;
});
var cljs$core$async$mult_$_state_machine__32153__auto____1 = (function (state_39343){
while(true){
var ret_value__32154__auto__ = (function (){try{while(true){
var result__32155__auto__ = switch__32152__auto__.call(null,state_39343);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32155__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32155__auto__;
}
break;
}
}catch (e39428){if((e39428 instanceof Object)){
var ex__32156__auto__ = e39428;
var statearr_39429_39486 = state_39343;
(statearr_39429_39486[(5)] = ex__32156__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_39343);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e39428;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32154__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39487 = state_39343;
state_39343 = G__39487;
continue;
} else {
return ret_value__32154__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__32153__auto__ = function(state_39343){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__32153__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__32153__auto____1.call(this,state_39343);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__32153__auto____0;
cljs$core$async$mult_$_state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__32153__auto____1;
return cljs$core$async$mult_$_state_machine__32153__auto__;
})()
;})(switch__32152__auto__,c__32217__auto___39431,cs,m,dchan,dctr,done))
})();
var state__32219__auto__ = (function (){var statearr_39430 = f__32218__auto__.call(null);
(statearr_39430[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32217__auto___39431);

return statearr_39430;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32219__auto__);
});})(c__32217__auto___39431,cs,m,dchan,dctr,done))
);


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var args39488 = [];
var len__29964__auto___39491 = arguments.length;
var i__29965__auto___39492 = (0);
while(true){
if((i__29965__auto___39492 < len__29964__auto___39491)){
args39488.push((arguments[i__29965__auto___39492]));

var G__39493 = (i__29965__auto___39492 + (1));
i__29965__auto___39492 = G__39493;
continue;
} else {
}
break;
}

var G__39490 = args39488.length;
switch (G__39490) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args39488.length)].join('')));

}
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.call(null,mult,ch,true);
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_.call(null,mult,ch,close_QMARK_);

return ch;
});

cljs.core.async.tap.cljs$lang$maxFixedArity = 3;
/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_.call(null,mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_.call(null,mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
var x__29561__auto__ = (((m == null))?null:m);
var m__29562__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__29561__auto__)]);
if(!((m__29562__auto__ == null))){
return m__29562__auto__.call(null,m,ch);
} else {
var m__29562__auto____$1 = (cljs.core.async.admix_STAR_["_"]);
if(!((m__29562__auto____$1 == null))){
return m__29562__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
}
});

cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
var x__29561__auto__ = (((m == null))?null:m);
var m__29562__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__29561__auto__)]);
if(!((m__29562__auto__ == null))){
return m__29562__auto__.call(null,m,ch);
} else {
var m__29562__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);
if(!((m__29562__auto____$1 == null))){
return m__29562__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
}
});

cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
var x__29561__auto__ = (((m == null))?null:m);
var m__29562__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__29561__auto__)]);
if(!((m__29562__auto__ == null))){
return m__29562__auto__.call(null,m);
} else {
var m__29562__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);
if(!((m__29562__auto____$1 == null))){
return m__29562__auto____$1.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
}
});

cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((!((m == null))) && (!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
var x__29561__auto__ = (((m == null))?null:m);
var m__29562__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__29561__auto__)]);
if(!((m__29562__auto__ == null))){
return m__29562__auto__.call(null,m,state_map);
} else {
var m__29562__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);
if(!((m__29562__auto____$1 == null))){
return m__29562__auto____$1.call(null,m,state_map);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
}
});

cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((!((m == null))) && (!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
var x__29561__auto__ = (((m == null))?null:m);
var m__29562__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__29561__auto__)]);
if(!((m__29562__auto__ == null))){
return m__29562__auto__.call(null,m,mode);
} else {
var m__29562__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);
if(!((m__29562__auto____$1 == null))){
return m__29562__auto____$1.call(null,m,mode);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__29971__auto__ = [];
var len__29964__auto___39505 = arguments.length;
var i__29965__auto___39506 = (0);
while(true){
if((i__29965__auto___39506 < len__29964__auto___39505)){
args__29971__auto__.push((arguments[i__29965__auto___39506]));

var G__39507 = (i__29965__auto___39506 + (1));
i__29965__auto___39506 = G__39507;
continue;
} else {
}
break;
}

var argseq__29972__auto__ = ((((3) < args__29971__auto__.length))?(new cljs.core.IndexedSeq(args__29971__auto__.slice((3)),(0))):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__29972__auto__);
});

cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__39499){
var map__39500 = p__39499;
var map__39500__$1 = ((((!((map__39500 == null)))?((((map__39500.cljs$lang$protocol_mask$partition0$ & (64))) || (map__39500.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__39500):map__39500);
var opts = map__39500__$1;
var statearr_39502_39508 = state;
(statearr_39502_39508[cljs.core.async.impl.ioc_helpers.STATE_IDX] = cont_block);


var temp__4425__auto__ = cljs.core.async.do_alts.call(null,((function (map__39500,map__39500__$1,opts){
return (function (val){
var statearr_39503_39509 = state;
(statearr_39503_39509[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
});})(map__39500,map__39500__$1,opts))
,ports,opts);
if(cljs.core.truth_(temp__4425__auto__)){
var cb = temp__4425__auto__;
var statearr_39504_39510 = state;
(statearr_39504_39510[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null,cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
});

cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3);

cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq39495){
var G__39496 = cljs.core.first.call(null,seq39495);
var seq39495__$1 = cljs.core.next.call(null,seq39495);
var G__39497 = cljs.core.first.call(null,seq39495__$1);
var seq39495__$2 = cljs.core.next.call(null,seq39495__$1);
var G__39498 = cljs.core.first.call(null,seq39495__$2);
var seq39495__$3 = cljs.core.next.call(null,seq39495__$2);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__39496,G__39497,G__39498,seq39495__$3);
});
/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.call(null,solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.call(null);
var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){
return cljs.core.async.put_BANG_.call(null,change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;
var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){
return cljs.core.reduce_kv.call(null,((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){
if(cljs.core.truth_(attr.call(null,v))){
return cljs.core.conj.call(null,ret,c);
} else {
return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;
var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){
var chs = cljs.core.deref.call(null,cs);
var mode = cljs.core.deref.call(null,solo_mode);
var solos = pick.call(null,new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick.call(null,new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.call(null,(((cljs.core._EQ_.call(null,mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && (!(cljs.core.empty_QMARK_.call(null,solos))))?cljs.core.vec.call(null,solos):cljs.core.vec.call(null,cljs.core.remove.call(null,pauses,cljs.core.keys.call(null,chs)))),change)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;
var m = (function (){
if(typeof cljs.core.async.t_cljs$core$async39674 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async39674 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta39675){
this.change = change;
this.mix = mix;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta39675 = meta39675;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async39674.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_39676,meta39675__$1){
var self__ = this;
var _39676__$1 = this;
return (new cljs.core.async.t_cljs$core$async39674(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta39675__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async39674.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_39676){
var self__ = this;
var _39676__$1 = this;
return self__.meta39675;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async39674.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async39674.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async39674.prototype.cljs$core$async$Mix$ = true;

cljs.core.async.t_cljs$core$async39674.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async39674.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async39674.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async39674.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async39674.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.solo_modes.call(null,mode))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("mode must be one of: "),cljs.core.str(self__.solo_modes)].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"mode","mode",-2000032078,null))))].join('')));
}

cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async39674.getBasis = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),cljs.core.with_meta(new cljs.core.Symbol(null,"mix","mix",2121373763,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"out","out",729986010,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mix of one or more input channels which will\n  be put on the supplied out channel. Input sources can be added to\n  the mix with 'admix', and removed with 'unmix'. A mix supports\n  soloing, muting and pausing multiple inputs atomically using\n  'toggle', and can solo using either muting or pausing as determined\n  by 'solo-mode'.\n\n  Each channel can have zero or more boolean modes set via 'toggle':\n\n  :solo - when true, only this (ond other soloed) channel(s) will appear\n          in the mix output channel. :mute and :pause states of soloed\n          channels are ignored. If solo-mode is :mute, non-soloed\n          channels are muted, if :pause, non-soloed channels are\n          paused.\n\n  :mute - muted channels will have their contents consumed but not included in the mix\n  :pause - paused channels will not have their contents consumed (and thus also not included in the mix)\n"], null)),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta39675","meta39675",-348851219,null)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async39674.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async39674.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async39674";

cljs.core.async.t_cljs$core$async39674.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__29504__auto__,writer__29505__auto__,opt__29506__auto__){
return cljs.core._write.call(null,writer__29505__auto__,"cljs.core.async/t_cljs$core$async39674");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.__GT_t_cljs$core$async39674 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function cljs$core$async$mix_$___GT_t_cljs$core$async39674(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta39675){
return (new cljs.core.async.t_cljs$core$async39674(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta39675));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

}

return (new cljs.core.async.t_cljs$core$async39674(change,cljs$core$async$mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__32217__auto___39837 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32217__auto___39837,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){
var f__32218__auto__ = (function (){var switch__32152__auto__ = ((function (c__32217__auto___39837,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_39774){
var state_val_39775 = (state_39774[(1)]);
if((state_val_39775 === (7))){
var inst_39692 = (state_39774[(2)]);
var state_39774__$1 = state_39774;
var statearr_39776_39838 = state_39774__$1;
(statearr_39776_39838[(2)] = inst_39692);

(statearr_39776_39838[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (20))){
var inst_39704 = (state_39774[(7)]);
var state_39774__$1 = state_39774;
var statearr_39777_39839 = state_39774__$1;
(statearr_39777_39839[(2)] = inst_39704);

(statearr_39777_39839[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (27))){
var state_39774__$1 = state_39774;
var statearr_39778_39840 = state_39774__$1;
(statearr_39778_39840[(2)] = null);

(statearr_39778_39840[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (1))){
var inst_39680 = (state_39774[(8)]);
var inst_39680__$1 = calc_state.call(null);
var inst_39682 = (inst_39680__$1 == null);
var inst_39683 = cljs.core.not.call(null,inst_39682);
var state_39774__$1 = (function (){var statearr_39779 = state_39774;
(statearr_39779[(8)] = inst_39680__$1);

return statearr_39779;
})();
if(inst_39683){
var statearr_39780_39841 = state_39774__$1;
(statearr_39780_39841[(1)] = (2));

} else {
var statearr_39781_39842 = state_39774__$1;
(statearr_39781_39842[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (24))){
var inst_39727 = (state_39774[(9)]);
var inst_39748 = (state_39774[(10)]);
var inst_39734 = (state_39774[(11)]);
var inst_39748__$1 = inst_39727.call(null,inst_39734);
var state_39774__$1 = (function (){var statearr_39782 = state_39774;
(statearr_39782[(10)] = inst_39748__$1);

return statearr_39782;
})();
if(cljs.core.truth_(inst_39748__$1)){
var statearr_39783_39843 = state_39774__$1;
(statearr_39783_39843[(1)] = (29));

} else {
var statearr_39784_39844 = state_39774__$1;
(statearr_39784_39844[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (4))){
var inst_39695 = (state_39774[(2)]);
var state_39774__$1 = state_39774;
if(cljs.core.truth_(inst_39695)){
var statearr_39785_39845 = state_39774__$1;
(statearr_39785_39845[(1)] = (8));

} else {
var statearr_39786_39846 = state_39774__$1;
(statearr_39786_39846[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (15))){
var inst_39721 = (state_39774[(2)]);
var state_39774__$1 = state_39774;
if(cljs.core.truth_(inst_39721)){
var statearr_39787_39847 = state_39774__$1;
(statearr_39787_39847[(1)] = (19));

} else {
var statearr_39788_39848 = state_39774__$1;
(statearr_39788_39848[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (21))){
var inst_39726 = (state_39774[(12)]);
var inst_39726__$1 = (state_39774[(2)]);
var inst_39727 = cljs.core.get.call(null,inst_39726__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_39728 = cljs.core.get.call(null,inst_39726__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_39729 = cljs.core.get.call(null,inst_39726__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_39774__$1 = (function (){var statearr_39789 = state_39774;
(statearr_39789[(9)] = inst_39727);

(statearr_39789[(13)] = inst_39728);

(statearr_39789[(12)] = inst_39726__$1);

return statearr_39789;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_39774__$1,(22),inst_39729);
} else {
if((state_val_39775 === (31))){
var inst_39756 = (state_39774[(2)]);
var state_39774__$1 = state_39774;
if(cljs.core.truth_(inst_39756)){
var statearr_39790_39849 = state_39774__$1;
(statearr_39790_39849[(1)] = (32));

} else {
var statearr_39791_39850 = state_39774__$1;
(statearr_39791_39850[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (32))){
var inst_39733 = (state_39774[(14)]);
var state_39774__$1 = state_39774;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_39774__$1,(35),out,inst_39733);
} else {
if((state_val_39775 === (33))){
var inst_39726 = (state_39774[(12)]);
var inst_39704 = inst_39726;
var state_39774__$1 = (function (){var statearr_39792 = state_39774;
(statearr_39792[(7)] = inst_39704);

return statearr_39792;
})();
var statearr_39793_39851 = state_39774__$1;
(statearr_39793_39851[(2)] = null);

(statearr_39793_39851[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (13))){
var inst_39704 = (state_39774[(7)]);
var inst_39711 = inst_39704.cljs$lang$protocol_mask$partition0$;
var inst_39712 = (inst_39711 & (64));
var inst_39713 = inst_39704.cljs$core$ISeq$;
var inst_39714 = (inst_39712) || (inst_39713);
var state_39774__$1 = state_39774;
if(cljs.core.truth_(inst_39714)){
var statearr_39794_39852 = state_39774__$1;
(statearr_39794_39852[(1)] = (16));

} else {
var statearr_39795_39853 = state_39774__$1;
(statearr_39795_39853[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (22))){
var inst_39733 = (state_39774[(14)]);
var inst_39734 = (state_39774[(11)]);
var inst_39732 = (state_39774[(2)]);
var inst_39733__$1 = cljs.core.nth.call(null,inst_39732,(0),null);
var inst_39734__$1 = cljs.core.nth.call(null,inst_39732,(1),null);
var inst_39735 = (inst_39733__$1 == null);
var inst_39736 = cljs.core._EQ_.call(null,inst_39734__$1,change);
var inst_39737 = (inst_39735) || (inst_39736);
var state_39774__$1 = (function (){var statearr_39796 = state_39774;
(statearr_39796[(14)] = inst_39733__$1);

(statearr_39796[(11)] = inst_39734__$1);

return statearr_39796;
})();
if(cljs.core.truth_(inst_39737)){
var statearr_39797_39854 = state_39774__$1;
(statearr_39797_39854[(1)] = (23));

} else {
var statearr_39798_39855 = state_39774__$1;
(statearr_39798_39855[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (36))){
var inst_39726 = (state_39774[(12)]);
var inst_39704 = inst_39726;
var state_39774__$1 = (function (){var statearr_39799 = state_39774;
(statearr_39799[(7)] = inst_39704);

return statearr_39799;
})();
var statearr_39800_39856 = state_39774__$1;
(statearr_39800_39856[(2)] = null);

(statearr_39800_39856[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (29))){
var inst_39748 = (state_39774[(10)]);
var state_39774__$1 = state_39774;
var statearr_39801_39857 = state_39774__$1;
(statearr_39801_39857[(2)] = inst_39748);

(statearr_39801_39857[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (6))){
var state_39774__$1 = state_39774;
var statearr_39802_39858 = state_39774__$1;
(statearr_39802_39858[(2)] = false);

(statearr_39802_39858[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (28))){
var inst_39744 = (state_39774[(2)]);
var inst_39745 = calc_state.call(null);
var inst_39704 = inst_39745;
var state_39774__$1 = (function (){var statearr_39803 = state_39774;
(statearr_39803[(7)] = inst_39704);

(statearr_39803[(15)] = inst_39744);

return statearr_39803;
})();
var statearr_39804_39859 = state_39774__$1;
(statearr_39804_39859[(2)] = null);

(statearr_39804_39859[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (25))){
var inst_39770 = (state_39774[(2)]);
var state_39774__$1 = state_39774;
var statearr_39805_39860 = state_39774__$1;
(statearr_39805_39860[(2)] = inst_39770);

(statearr_39805_39860[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (34))){
var inst_39768 = (state_39774[(2)]);
var state_39774__$1 = state_39774;
var statearr_39806_39861 = state_39774__$1;
(statearr_39806_39861[(2)] = inst_39768);

(statearr_39806_39861[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (17))){
var state_39774__$1 = state_39774;
var statearr_39807_39862 = state_39774__$1;
(statearr_39807_39862[(2)] = false);

(statearr_39807_39862[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (3))){
var state_39774__$1 = state_39774;
var statearr_39808_39863 = state_39774__$1;
(statearr_39808_39863[(2)] = false);

(statearr_39808_39863[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (12))){
var inst_39772 = (state_39774[(2)]);
var state_39774__$1 = state_39774;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_39774__$1,inst_39772);
} else {
if((state_val_39775 === (2))){
var inst_39680 = (state_39774[(8)]);
var inst_39685 = inst_39680.cljs$lang$protocol_mask$partition0$;
var inst_39686 = (inst_39685 & (64));
var inst_39687 = inst_39680.cljs$core$ISeq$;
var inst_39688 = (inst_39686) || (inst_39687);
var state_39774__$1 = state_39774;
if(cljs.core.truth_(inst_39688)){
var statearr_39809_39864 = state_39774__$1;
(statearr_39809_39864[(1)] = (5));

} else {
var statearr_39810_39865 = state_39774__$1;
(statearr_39810_39865[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (23))){
var inst_39733 = (state_39774[(14)]);
var inst_39739 = (inst_39733 == null);
var state_39774__$1 = state_39774;
if(cljs.core.truth_(inst_39739)){
var statearr_39811_39866 = state_39774__$1;
(statearr_39811_39866[(1)] = (26));

} else {
var statearr_39812_39867 = state_39774__$1;
(statearr_39812_39867[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (35))){
var inst_39759 = (state_39774[(2)]);
var state_39774__$1 = state_39774;
if(cljs.core.truth_(inst_39759)){
var statearr_39813_39868 = state_39774__$1;
(statearr_39813_39868[(1)] = (36));

} else {
var statearr_39814_39869 = state_39774__$1;
(statearr_39814_39869[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (19))){
var inst_39704 = (state_39774[(7)]);
var inst_39723 = cljs.core.apply.call(null,cljs.core.hash_map,inst_39704);
var state_39774__$1 = state_39774;
var statearr_39815_39870 = state_39774__$1;
(statearr_39815_39870[(2)] = inst_39723);

(statearr_39815_39870[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (11))){
var inst_39704 = (state_39774[(7)]);
var inst_39708 = (inst_39704 == null);
var inst_39709 = cljs.core.not.call(null,inst_39708);
var state_39774__$1 = state_39774;
if(inst_39709){
var statearr_39816_39871 = state_39774__$1;
(statearr_39816_39871[(1)] = (13));

} else {
var statearr_39817_39872 = state_39774__$1;
(statearr_39817_39872[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (9))){
var inst_39680 = (state_39774[(8)]);
var state_39774__$1 = state_39774;
var statearr_39818_39873 = state_39774__$1;
(statearr_39818_39873[(2)] = inst_39680);

(statearr_39818_39873[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (5))){
var state_39774__$1 = state_39774;
var statearr_39819_39874 = state_39774__$1;
(statearr_39819_39874[(2)] = true);

(statearr_39819_39874[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (14))){
var state_39774__$1 = state_39774;
var statearr_39820_39875 = state_39774__$1;
(statearr_39820_39875[(2)] = false);

(statearr_39820_39875[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (26))){
var inst_39734 = (state_39774[(11)]);
var inst_39741 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_39734);
var state_39774__$1 = state_39774;
var statearr_39821_39876 = state_39774__$1;
(statearr_39821_39876[(2)] = inst_39741);

(statearr_39821_39876[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (16))){
var state_39774__$1 = state_39774;
var statearr_39822_39877 = state_39774__$1;
(statearr_39822_39877[(2)] = true);

(statearr_39822_39877[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (38))){
var inst_39764 = (state_39774[(2)]);
var state_39774__$1 = state_39774;
var statearr_39823_39878 = state_39774__$1;
(statearr_39823_39878[(2)] = inst_39764);

(statearr_39823_39878[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (30))){
var inst_39727 = (state_39774[(9)]);
var inst_39728 = (state_39774[(13)]);
var inst_39734 = (state_39774[(11)]);
var inst_39751 = cljs.core.empty_QMARK_.call(null,inst_39727);
var inst_39752 = inst_39728.call(null,inst_39734);
var inst_39753 = cljs.core.not.call(null,inst_39752);
var inst_39754 = (inst_39751) && (inst_39753);
var state_39774__$1 = state_39774;
var statearr_39824_39879 = state_39774__$1;
(statearr_39824_39879[(2)] = inst_39754);

(statearr_39824_39879[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (10))){
var inst_39680 = (state_39774[(8)]);
var inst_39700 = (state_39774[(2)]);
var inst_39701 = cljs.core.get.call(null,inst_39700,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_39702 = cljs.core.get.call(null,inst_39700,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_39703 = cljs.core.get.call(null,inst_39700,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_39704 = inst_39680;
var state_39774__$1 = (function (){var statearr_39825 = state_39774;
(statearr_39825[(7)] = inst_39704);

(statearr_39825[(16)] = inst_39701);

(statearr_39825[(17)] = inst_39703);

(statearr_39825[(18)] = inst_39702);

return statearr_39825;
})();
var statearr_39826_39880 = state_39774__$1;
(statearr_39826_39880[(2)] = null);

(statearr_39826_39880[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (18))){
var inst_39718 = (state_39774[(2)]);
var state_39774__$1 = state_39774;
var statearr_39827_39881 = state_39774__$1;
(statearr_39827_39881[(2)] = inst_39718);

(statearr_39827_39881[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (37))){
var state_39774__$1 = state_39774;
var statearr_39828_39882 = state_39774__$1;
(statearr_39828_39882[(2)] = null);

(statearr_39828_39882[(1)] = (38));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39775 === (8))){
var inst_39680 = (state_39774[(8)]);
var inst_39697 = cljs.core.apply.call(null,cljs.core.hash_map,inst_39680);
var state_39774__$1 = state_39774;
var statearr_39829_39883 = state_39774__$1;
(statearr_39829_39883[(2)] = inst_39697);

(statearr_39829_39883[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__32217__auto___39837,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;
return ((function (switch__32152__auto__,c__32217__auto___39837,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var cljs$core$async$mix_$_state_machine__32153__auto__ = null;
var cljs$core$async$mix_$_state_machine__32153__auto____0 = (function (){
var statearr_39833 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_39833[(0)] = cljs$core$async$mix_$_state_machine__32153__auto__);

(statearr_39833[(1)] = (1));

return statearr_39833;
});
var cljs$core$async$mix_$_state_machine__32153__auto____1 = (function (state_39774){
while(true){
var ret_value__32154__auto__ = (function (){try{while(true){
var result__32155__auto__ = switch__32152__auto__.call(null,state_39774);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32155__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32155__auto__;
}
break;
}
}catch (e39834){if((e39834 instanceof Object)){
var ex__32156__auto__ = e39834;
var statearr_39835_39884 = state_39774;
(statearr_39835_39884[(5)] = ex__32156__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_39774);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e39834;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32154__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39885 = state_39774;
state_39774 = G__39885;
continue;
} else {
return ret_value__32154__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__32153__auto__ = function(state_39774){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__32153__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__32153__auto____1.call(this,state_39774);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__32153__auto____0;
cljs$core$async$mix_$_state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__32153__auto____1;
return cljs$core$async$mix_$_state_machine__32153__auto__;
})()
;})(switch__32152__auto__,c__32217__auto___39837,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();
var state__32219__auto__ = (function (){var statearr_39836 = f__32218__auto__.call(null);
(statearr_39836[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32217__auto___39837);

return statearr_39836;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32219__auto__);
});})(c__32217__auto___39837,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
);


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_.call(null,mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_.call(null,mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_.call(null,mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_.call(null,mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_.call(null,mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((!((p == null))) && (!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
var x__29561__auto__ = (((p == null))?null:p);
var m__29562__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__29561__auto__)]);
if(!((m__29562__auto__ == null))){
return m__29562__auto__.call(null,p,v,ch,close_QMARK_);
} else {
var m__29562__auto____$1 = (cljs.core.async.sub_STAR_["_"]);
if(!((m__29562__auto____$1 == null))){
return m__29562__auto____$1.call(null,p,v,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
}
});

cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
var x__29561__auto__ = (((p == null))?null:p);
var m__29562__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__29561__auto__)]);
if(!((m__29562__auto__ == null))){
return m__29562__auto__.call(null,p,v,ch);
} else {
var m__29562__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);
if(!((m__29562__auto____$1 == null))){
return m__29562__auto____$1.call(null,p,v,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var args39886 = [];
var len__29964__auto___39889 = arguments.length;
var i__29965__auto___39890 = (0);
while(true){
if((i__29965__auto___39890 < len__29964__auto___39889)){
args39886.push((arguments[i__29965__auto___39890]));

var G__39891 = (i__29965__auto___39890 + (1));
i__29965__auto___39890 = G__39891;
continue;
} else {
}
break;
}

var G__39888 = args39886.length;
switch (G__39888) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args39886.length)].join('')));

}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
var x__29561__auto__ = (((p == null))?null:p);
var m__29562__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__29561__auto__)]);
if(!((m__29562__auto__ == null))){
return m__29562__auto__.call(null,p);
} else {
var m__29562__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__29562__auto____$1 == null))){
return m__29562__auto____$1.call(null,p);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
var x__29561__auto__ = (((p == null))?null:p);
var m__29562__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__29561__auto__)]);
if(!((m__29562__auto__ == null))){
return m__29562__auto__.call(null,p,v);
} else {
var m__29562__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__29562__auto____$1 == null))){
return m__29562__auto____$1.call(null,p,v);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2;

/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var args39894 = [];
var len__29964__auto___40019 = arguments.length;
var i__29965__auto___40020 = (0);
while(true){
if((i__29965__auto___40020 < len__29964__auto___40019)){
args39894.push((arguments[i__29965__auto___40020]));

var G__40021 = (i__29965__auto___40020 + (1));
i__29965__auto___40020 = G__40021;
continue;
} else {
}
break;
}

var G__39896 = args39894.length;
switch (G__39896) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args39894.length)].join('')));

}
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = ((function (mults){
return (function (topic){
var or__28906__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);
if(cljs.core.truth_(or__28906__auto__)){
return or__28906__auto__;
} else {
return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__28906__auto__,mults){
return (function (p1__39893_SHARP_){
if(cljs.core.truth_(p1__39893_SHARP_.call(null,topic))){
return p1__39893_SHARP_;
} else {
return cljs.core.assoc.call(null,p1__39893_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__28906__auto__,mults))
),topic);
}
});})(mults))
;
var p = (function (){
if(typeof cljs.core.async.t_cljs$core$async39897 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async39897 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta39898){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta39898 = meta39898;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async39897.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_39899,meta39898__$1){
var self__ = this;
var _39899__$1 = this;
return (new cljs.core.async.t_cljs$core$async39897(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta39898__$1));
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async39897.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_39899){
var self__ = this;
var _39899__$1 = this;
return self__.meta39898;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async39897.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async39897.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async39897.prototype.cljs$core$async$Pub$ = true;

cljs.core.async.t_cljs$core$async39897.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = self__.ensure_mult.call(null,topic);
return cljs.core.async.tap.call(null,m,ch__$1,close_QMARK_);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async39897.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__4425__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);
if(cljs.core.truth_(temp__4425__auto__)){
var m = temp__4425__auto__;
return cljs.core.async.untap.call(null,m,ch__$1);
} else {
return null;
}
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async39897.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async39897.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async39897.getBasis = ((function (mults,ensure_mult){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta39898","meta39898",1683243748,null)], null);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async39897.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async39897.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async39897";

cljs.core.async.t_cljs$core$async39897.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__29504__auto__,writer__29505__auto__,opt__29506__auto__){
return cljs.core._write.call(null,writer__29505__auto__,"cljs.core.async/t_cljs$core$async39897");
});})(mults,ensure_mult))
;

cljs.core.async.__GT_t_cljs$core$async39897 = ((function (mults,ensure_mult){
return (function cljs$core$async$__GT_t_cljs$core$async39897(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta39898){
return (new cljs.core.async.t_cljs$core$async39897(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta39898));
});})(mults,ensure_mult))
;

}

return (new cljs.core.async.t_cljs$core$async39897(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__32217__auto___40023 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32217__auto___40023,mults,ensure_mult,p){
return (function (){
var f__32218__auto__ = (function (){var switch__32152__auto__ = ((function (c__32217__auto___40023,mults,ensure_mult,p){
return (function (state_39971){
var state_val_39972 = (state_39971[(1)]);
if((state_val_39972 === (7))){
var inst_39967 = (state_39971[(2)]);
var state_39971__$1 = state_39971;
var statearr_39973_40024 = state_39971__$1;
(statearr_39973_40024[(2)] = inst_39967);

(statearr_39973_40024[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39972 === (20))){
var state_39971__$1 = state_39971;
var statearr_39974_40025 = state_39971__$1;
(statearr_39974_40025[(2)] = null);

(statearr_39974_40025[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39972 === (1))){
var state_39971__$1 = state_39971;
var statearr_39975_40026 = state_39971__$1;
(statearr_39975_40026[(2)] = null);

(statearr_39975_40026[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39972 === (24))){
var inst_39950 = (state_39971[(7)]);
var inst_39959 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_39950);
var state_39971__$1 = state_39971;
var statearr_39976_40027 = state_39971__$1;
(statearr_39976_40027[(2)] = inst_39959);

(statearr_39976_40027[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39972 === (4))){
var inst_39902 = (state_39971[(8)]);
var inst_39902__$1 = (state_39971[(2)]);
var inst_39903 = (inst_39902__$1 == null);
var state_39971__$1 = (function (){var statearr_39977 = state_39971;
(statearr_39977[(8)] = inst_39902__$1);

return statearr_39977;
})();
if(cljs.core.truth_(inst_39903)){
var statearr_39978_40028 = state_39971__$1;
(statearr_39978_40028[(1)] = (5));

} else {
var statearr_39979_40029 = state_39971__$1;
(statearr_39979_40029[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39972 === (15))){
var inst_39944 = (state_39971[(2)]);
var state_39971__$1 = state_39971;
var statearr_39980_40030 = state_39971__$1;
(statearr_39980_40030[(2)] = inst_39944);

(statearr_39980_40030[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39972 === (21))){
var inst_39964 = (state_39971[(2)]);
var state_39971__$1 = (function (){var statearr_39981 = state_39971;
(statearr_39981[(9)] = inst_39964);

return statearr_39981;
})();
var statearr_39982_40031 = state_39971__$1;
(statearr_39982_40031[(2)] = null);

(statearr_39982_40031[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39972 === (13))){
var inst_39926 = (state_39971[(10)]);
var inst_39928 = cljs.core.chunked_seq_QMARK_.call(null,inst_39926);
var state_39971__$1 = state_39971;
if(inst_39928){
var statearr_39983_40032 = state_39971__$1;
(statearr_39983_40032[(1)] = (16));

} else {
var statearr_39984_40033 = state_39971__$1;
(statearr_39984_40033[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39972 === (22))){
var inst_39956 = (state_39971[(2)]);
var state_39971__$1 = state_39971;
if(cljs.core.truth_(inst_39956)){
var statearr_39985_40034 = state_39971__$1;
(statearr_39985_40034[(1)] = (23));

} else {
var statearr_39986_40035 = state_39971__$1;
(statearr_39986_40035[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39972 === (6))){
var inst_39950 = (state_39971[(7)]);
var inst_39902 = (state_39971[(8)]);
var inst_39952 = (state_39971[(11)]);
var inst_39950__$1 = topic_fn.call(null,inst_39902);
var inst_39951 = cljs.core.deref.call(null,mults);
var inst_39952__$1 = cljs.core.get.call(null,inst_39951,inst_39950__$1);
var state_39971__$1 = (function (){var statearr_39987 = state_39971;
(statearr_39987[(7)] = inst_39950__$1);

(statearr_39987[(11)] = inst_39952__$1);

return statearr_39987;
})();
if(cljs.core.truth_(inst_39952__$1)){
var statearr_39988_40036 = state_39971__$1;
(statearr_39988_40036[(1)] = (19));

} else {
var statearr_39989_40037 = state_39971__$1;
(statearr_39989_40037[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39972 === (25))){
var inst_39961 = (state_39971[(2)]);
var state_39971__$1 = state_39971;
var statearr_39990_40038 = state_39971__$1;
(statearr_39990_40038[(2)] = inst_39961);

(statearr_39990_40038[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39972 === (17))){
var inst_39926 = (state_39971[(10)]);
var inst_39935 = cljs.core.first.call(null,inst_39926);
var inst_39936 = cljs.core.async.muxch_STAR_.call(null,inst_39935);
var inst_39937 = cljs.core.async.close_BANG_.call(null,inst_39936);
var inst_39938 = cljs.core.next.call(null,inst_39926);
var inst_39912 = inst_39938;
var inst_39913 = null;
var inst_39914 = (0);
var inst_39915 = (0);
var state_39971__$1 = (function (){var statearr_39991 = state_39971;
(statearr_39991[(12)] = inst_39915);

(statearr_39991[(13)] = inst_39913);

(statearr_39991[(14)] = inst_39912);

(statearr_39991[(15)] = inst_39914);

(statearr_39991[(16)] = inst_39937);

return statearr_39991;
})();
var statearr_39992_40039 = state_39971__$1;
(statearr_39992_40039[(2)] = null);

(statearr_39992_40039[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39972 === (3))){
var inst_39969 = (state_39971[(2)]);
var state_39971__$1 = state_39971;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_39971__$1,inst_39969);
} else {
if((state_val_39972 === (12))){
var inst_39946 = (state_39971[(2)]);
var state_39971__$1 = state_39971;
var statearr_39993_40040 = state_39971__$1;
(statearr_39993_40040[(2)] = inst_39946);

(statearr_39993_40040[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39972 === (2))){
var state_39971__$1 = state_39971;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39971__$1,(4),ch);
} else {
if((state_val_39972 === (23))){
var state_39971__$1 = state_39971;
var statearr_39994_40041 = state_39971__$1;
(statearr_39994_40041[(2)] = null);

(statearr_39994_40041[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39972 === (19))){
var inst_39902 = (state_39971[(8)]);
var inst_39952 = (state_39971[(11)]);
var inst_39954 = cljs.core.async.muxch_STAR_.call(null,inst_39952);
var state_39971__$1 = state_39971;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_39971__$1,(22),inst_39954,inst_39902);
} else {
if((state_val_39972 === (11))){
var inst_39912 = (state_39971[(14)]);
var inst_39926 = (state_39971[(10)]);
var inst_39926__$1 = cljs.core.seq.call(null,inst_39912);
var state_39971__$1 = (function (){var statearr_39995 = state_39971;
(statearr_39995[(10)] = inst_39926__$1);

return statearr_39995;
})();
if(inst_39926__$1){
var statearr_39996_40042 = state_39971__$1;
(statearr_39996_40042[(1)] = (13));

} else {
var statearr_39997_40043 = state_39971__$1;
(statearr_39997_40043[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39972 === (9))){
var inst_39948 = (state_39971[(2)]);
var state_39971__$1 = state_39971;
var statearr_39998_40044 = state_39971__$1;
(statearr_39998_40044[(2)] = inst_39948);

(statearr_39998_40044[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39972 === (5))){
var inst_39909 = cljs.core.deref.call(null,mults);
var inst_39910 = cljs.core.vals.call(null,inst_39909);
var inst_39911 = cljs.core.seq.call(null,inst_39910);
var inst_39912 = inst_39911;
var inst_39913 = null;
var inst_39914 = (0);
var inst_39915 = (0);
var state_39971__$1 = (function (){var statearr_39999 = state_39971;
(statearr_39999[(12)] = inst_39915);

(statearr_39999[(13)] = inst_39913);

(statearr_39999[(14)] = inst_39912);

(statearr_39999[(15)] = inst_39914);

return statearr_39999;
})();
var statearr_40000_40045 = state_39971__$1;
(statearr_40000_40045[(2)] = null);

(statearr_40000_40045[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39972 === (14))){
var state_39971__$1 = state_39971;
var statearr_40004_40046 = state_39971__$1;
(statearr_40004_40046[(2)] = null);

(statearr_40004_40046[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39972 === (16))){
var inst_39926 = (state_39971[(10)]);
var inst_39930 = cljs.core.chunk_first.call(null,inst_39926);
var inst_39931 = cljs.core.chunk_rest.call(null,inst_39926);
var inst_39932 = cljs.core.count.call(null,inst_39930);
var inst_39912 = inst_39931;
var inst_39913 = inst_39930;
var inst_39914 = inst_39932;
var inst_39915 = (0);
var state_39971__$1 = (function (){var statearr_40005 = state_39971;
(statearr_40005[(12)] = inst_39915);

(statearr_40005[(13)] = inst_39913);

(statearr_40005[(14)] = inst_39912);

(statearr_40005[(15)] = inst_39914);

return statearr_40005;
})();
var statearr_40006_40047 = state_39971__$1;
(statearr_40006_40047[(2)] = null);

(statearr_40006_40047[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39972 === (10))){
var inst_39915 = (state_39971[(12)]);
var inst_39913 = (state_39971[(13)]);
var inst_39912 = (state_39971[(14)]);
var inst_39914 = (state_39971[(15)]);
var inst_39920 = cljs.core._nth.call(null,inst_39913,inst_39915);
var inst_39921 = cljs.core.async.muxch_STAR_.call(null,inst_39920);
var inst_39922 = cljs.core.async.close_BANG_.call(null,inst_39921);
var inst_39923 = (inst_39915 + (1));
var tmp40001 = inst_39913;
var tmp40002 = inst_39912;
var tmp40003 = inst_39914;
var inst_39912__$1 = tmp40002;
var inst_39913__$1 = tmp40001;
var inst_39914__$1 = tmp40003;
var inst_39915__$1 = inst_39923;
var state_39971__$1 = (function (){var statearr_40007 = state_39971;
(statearr_40007[(12)] = inst_39915__$1);

(statearr_40007[(13)] = inst_39913__$1);

(statearr_40007[(14)] = inst_39912__$1);

(statearr_40007[(17)] = inst_39922);

(statearr_40007[(15)] = inst_39914__$1);

return statearr_40007;
})();
var statearr_40008_40048 = state_39971__$1;
(statearr_40008_40048[(2)] = null);

(statearr_40008_40048[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39972 === (18))){
var inst_39941 = (state_39971[(2)]);
var state_39971__$1 = state_39971;
var statearr_40009_40049 = state_39971__$1;
(statearr_40009_40049[(2)] = inst_39941);

(statearr_40009_40049[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39972 === (8))){
var inst_39915 = (state_39971[(12)]);
var inst_39914 = (state_39971[(15)]);
var inst_39917 = (inst_39915 < inst_39914);
var inst_39918 = inst_39917;
var state_39971__$1 = state_39971;
if(cljs.core.truth_(inst_39918)){
var statearr_40010_40050 = state_39971__$1;
(statearr_40010_40050[(1)] = (10));

} else {
var statearr_40011_40051 = state_39971__$1;
(statearr_40011_40051[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__32217__auto___40023,mults,ensure_mult,p))
;
return ((function (switch__32152__auto__,c__32217__auto___40023,mults,ensure_mult,p){
return (function() {
var cljs$core$async$state_machine__32153__auto__ = null;
var cljs$core$async$state_machine__32153__auto____0 = (function (){
var statearr_40015 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_40015[(0)] = cljs$core$async$state_machine__32153__auto__);

(statearr_40015[(1)] = (1));

return statearr_40015;
});
var cljs$core$async$state_machine__32153__auto____1 = (function (state_39971){
while(true){
var ret_value__32154__auto__ = (function (){try{while(true){
var result__32155__auto__ = switch__32152__auto__.call(null,state_39971);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32155__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32155__auto__;
}
break;
}
}catch (e40016){if((e40016 instanceof Object)){
var ex__32156__auto__ = e40016;
var statearr_40017_40052 = state_39971;
(statearr_40017_40052[(5)] = ex__32156__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_39971);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40016;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32154__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40053 = state_39971;
state_39971 = G__40053;
continue;
} else {
return ret_value__32154__auto__;
}
break;
}
});
cljs$core$async$state_machine__32153__auto__ = function(state_39971){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__32153__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__32153__auto____1.call(this,state_39971);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__32153__auto____0;
cljs$core$async$state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__32153__auto____1;
return cljs$core$async$state_machine__32153__auto__;
})()
;})(switch__32152__auto__,c__32217__auto___40023,mults,ensure_mult,p))
})();
var state__32219__auto__ = (function (){var statearr_40018 = f__32218__auto__.call(null);
(statearr_40018[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32217__auto___40023);

return statearr_40018;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32219__auto__);
});})(c__32217__auto___40023,mults,ensure_mult,p))
);


return p;
});

cljs.core.async.pub.cljs$lang$maxFixedArity = 3;
/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var args40054 = [];
var len__29964__auto___40057 = arguments.length;
var i__29965__auto___40058 = (0);
while(true){
if((i__29965__auto___40058 < len__29964__auto___40057)){
args40054.push((arguments[i__29965__auto___40058]));

var G__40059 = (i__29965__auto___40058 + (1));
i__29965__auto___40058 = G__40059;
continue;
} else {
}
break;
}

var G__40056 = args40054.length;
switch (G__40056) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40054.length)].join('')));

}
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.call(null,p,topic,ch,true);
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_.call(null,p,topic,ch,close_QMARK_);
});

cljs.core.async.sub.cljs$lang$maxFixedArity = 4;
/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_.call(null,p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var args40061 = [];
var len__29964__auto___40064 = arguments.length;
var i__29965__auto___40065 = (0);
while(true){
if((i__29965__auto___40065 < len__29964__auto___40064)){
args40061.push((arguments[i__29965__auto___40065]));

var G__40066 = (i__29965__auto___40065 + (1));
i__29965__auto___40065 = G__40066;
continue;
} else {
}
break;
}

var G__40063 = args40061.length;
switch (G__40063) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40061.length)].join('')));

}
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_.call(null,p);
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_.call(null,p,topic);
});

cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2;
/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var args40068 = [];
var len__29964__auto___40139 = arguments.length;
var i__29965__auto___40140 = (0);
while(true){
if((i__29965__auto___40140 < len__29964__auto___40139)){
args40068.push((arguments[i__29965__auto___40140]));

var G__40141 = (i__29965__auto___40140 + (1));
i__29965__auto___40140 = G__40141;
continue;
} else {
}
break;
}

var G__40070 = args40068.length;
switch (G__40070) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40068.length)].join('')));

}
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.call(null,f,chs,null);
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec.call(null,chs);
var out = cljs.core.async.chan.call(null,buf_or_n);
var cnt = cljs.core.count.call(null,chs__$1);
var rets = cljs.core.object_array.call(null,cnt);
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = cljs.core.mapv.call(null,((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){
return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,rets.slice((0)));
} else {
return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.call(null,cnt));
var c__32217__auto___40143 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32217__auto___40143,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){
var f__32218__auto__ = (function (){var switch__32152__auto__ = ((function (c__32217__auto___40143,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_40109){
var state_val_40110 = (state_40109[(1)]);
if((state_val_40110 === (7))){
var state_40109__$1 = state_40109;
var statearr_40111_40144 = state_40109__$1;
(statearr_40111_40144[(2)] = null);

(statearr_40111_40144[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40110 === (1))){
var state_40109__$1 = state_40109;
var statearr_40112_40145 = state_40109__$1;
(statearr_40112_40145[(2)] = null);

(statearr_40112_40145[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40110 === (4))){
var inst_40073 = (state_40109[(7)]);
var inst_40075 = (inst_40073 < cnt);
var state_40109__$1 = state_40109;
if(cljs.core.truth_(inst_40075)){
var statearr_40113_40146 = state_40109__$1;
(statearr_40113_40146[(1)] = (6));

} else {
var statearr_40114_40147 = state_40109__$1;
(statearr_40114_40147[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40110 === (15))){
var inst_40105 = (state_40109[(2)]);
var state_40109__$1 = state_40109;
var statearr_40115_40148 = state_40109__$1;
(statearr_40115_40148[(2)] = inst_40105);

(statearr_40115_40148[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40110 === (13))){
var inst_40098 = cljs.core.async.close_BANG_.call(null,out);
var state_40109__$1 = state_40109;
var statearr_40116_40149 = state_40109__$1;
(statearr_40116_40149[(2)] = inst_40098);

(statearr_40116_40149[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40110 === (6))){
var state_40109__$1 = state_40109;
var statearr_40117_40150 = state_40109__$1;
(statearr_40117_40150[(2)] = null);

(statearr_40117_40150[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40110 === (3))){
var inst_40107 = (state_40109[(2)]);
var state_40109__$1 = state_40109;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40109__$1,inst_40107);
} else {
if((state_val_40110 === (12))){
var inst_40095 = (state_40109[(8)]);
var inst_40095__$1 = (state_40109[(2)]);
var inst_40096 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_40095__$1);
var state_40109__$1 = (function (){var statearr_40118 = state_40109;
(statearr_40118[(8)] = inst_40095__$1);

return statearr_40118;
})();
if(cljs.core.truth_(inst_40096)){
var statearr_40119_40151 = state_40109__$1;
(statearr_40119_40151[(1)] = (13));

} else {
var statearr_40120_40152 = state_40109__$1;
(statearr_40120_40152[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40110 === (2))){
var inst_40072 = cljs.core.reset_BANG_.call(null,dctr,cnt);
var inst_40073 = (0);
var state_40109__$1 = (function (){var statearr_40121 = state_40109;
(statearr_40121[(9)] = inst_40072);

(statearr_40121[(7)] = inst_40073);

return statearr_40121;
})();
var statearr_40122_40153 = state_40109__$1;
(statearr_40122_40153[(2)] = null);

(statearr_40122_40153[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40110 === (11))){
var inst_40073 = (state_40109[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_40109,(10),Object,null,(9));
var inst_40082 = chs__$1.call(null,inst_40073);
var inst_40083 = done.call(null,inst_40073);
var inst_40084 = cljs.core.async.take_BANG_.call(null,inst_40082,inst_40083);
var state_40109__$1 = state_40109;
var statearr_40123_40154 = state_40109__$1;
(statearr_40123_40154[(2)] = inst_40084);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40109__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40110 === (9))){
var inst_40073 = (state_40109[(7)]);
var inst_40086 = (state_40109[(2)]);
var inst_40087 = (inst_40073 + (1));
var inst_40073__$1 = inst_40087;
var state_40109__$1 = (function (){var statearr_40124 = state_40109;
(statearr_40124[(7)] = inst_40073__$1);

(statearr_40124[(10)] = inst_40086);

return statearr_40124;
})();
var statearr_40125_40155 = state_40109__$1;
(statearr_40125_40155[(2)] = null);

(statearr_40125_40155[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40110 === (5))){
var inst_40093 = (state_40109[(2)]);
var state_40109__$1 = (function (){var statearr_40126 = state_40109;
(statearr_40126[(11)] = inst_40093);

return statearr_40126;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40109__$1,(12),dchan);
} else {
if((state_val_40110 === (14))){
var inst_40095 = (state_40109[(8)]);
var inst_40100 = cljs.core.apply.call(null,f,inst_40095);
var state_40109__$1 = state_40109;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_40109__$1,(16),out,inst_40100);
} else {
if((state_val_40110 === (16))){
var inst_40102 = (state_40109[(2)]);
var state_40109__$1 = (function (){var statearr_40127 = state_40109;
(statearr_40127[(12)] = inst_40102);

return statearr_40127;
})();
var statearr_40128_40156 = state_40109__$1;
(statearr_40128_40156[(2)] = null);

(statearr_40128_40156[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40110 === (10))){
var inst_40077 = (state_40109[(2)]);
var inst_40078 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);
var state_40109__$1 = (function (){var statearr_40129 = state_40109;
(statearr_40129[(13)] = inst_40077);

return statearr_40129;
})();
var statearr_40130_40157 = state_40109__$1;
(statearr_40130_40157[(2)] = inst_40078);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40109__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40110 === (8))){
var inst_40091 = (state_40109[(2)]);
var state_40109__$1 = state_40109;
var statearr_40131_40158 = state_40109__$1;
(statearr_40131_40158[(2)] = inst_40091);

(statearr_40131_40158[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__32217__auto___40143,chs__$1,out,cnt,rets,dchan,dctr,done))
;
return ((function (switch__32152__auto__,c__32217__auto___40143,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var cljs$core$async$state_machine__32153__auto__ = null;
var cljs$core$async$state_machine__32153__auto____0 = (function (){
var statearr_40135 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_40135[(0)] = cljs$core$async$state_machine__32153__auto__);

(statearr_40135[(1)] = (1));

return statearr_40135;
});
var cljs$core$async$state_machine__32153__auto____1 = (function (state_40109){
while(true){
var ret_value__32154__auto__ = (function (){try{while(true){
var result__32155__auto__ = switch__32152__auto__.call(null,state_40109);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32155__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32155__auto__;
}
break;
}
}catch (e40136){if((e40136 instanceof Object)){
var ex__32156__auto__ = e40136;
var statearr_40137_40159 = state_40109;
(statearr_40137_40159[(5)] = ex__32156__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40109);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40136;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32154__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40160 = state_40109;
state_40109 = G__40160;
continue;
} else {
return ret_value__32154__auto__;
}
break;
}
});
cljs$core$async$state_machine__32153__auto__ = function(state_40109){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__32153__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__32153__auto____1.call(this,state_40109);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__32153__auto____0;
cljs$core$async$state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__32153__auto____1;
return cljs$core$async$state_machine__32153__auto__;
})()
;})(switch__32152__auto__,c__32217__auto___40143,chs__$1,out,cnt,rets,dchan,dctr,done))
})();
var state__32219__auto__ = (function (){var statearr_40138 = f__32218__auto__.call(null);
(statearr_40138[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32217__auto___40143);

return statearr_40138;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32219__auto__);
});})(c__32217__auto___40143,chs__$1,out,cnt,rets,dchan,dctr,done))
);


return out;
});

cljs.core.async.map.cljs$lang$maxFixedArity = 3;
/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var args40162 = [];
var len__29964__auto___40220 = arguments.length;
var i__29965__auto___40221 = (0);
while(true){
if((i__29965__auto___40221 < len__29964__auto___40220)){
args40162.push((arguments[i__29965__auto___40221]));

var G__40222 = (i__29965__auto___40221 + (1));
i__29965__auto___40221 = G__40222;
continue;
} else {
}
break;
}

var G__40164 = args40162.length;
switch (G__40164) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40162.length)].join('')));

}
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.call(null,chs,null);
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__32217__auto___40224 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32217__auto___40224,out){
return (function (){
var f__32218__auto__ = (function (){var switch__32152__auto__ = ((function (c__32217__auto___40224,out){
return (function (state_40194){
var state_val_40195 = (state_40194[(1)]);
if((state_val_40195 === (7))){
var inst_40173 = (state_40194[(7)]);
var inst_40174 = (state_40194[(8)]);
var inst_40173__$1 = (state_40194[(2)]);
var inst_40174__$1 = cljs.core.nth.call(null,inst_40173__$1,(0),null);
var inst_40175 = cljs.core.nth.call(null,inst_40173__$1,(1),null);
var inst_40176 = (inst_40174__$1 == null);
var state_40194__$1 = (function (){var statearr_40196 = state_40194;
(statearr_40196[(7)] = inst_40173__$1);

(statearr_40196[(8)] = inst_40174__$1);

(statearr_40196[(9)] = inst_40175);

return statearr_40196;
})();
if(cljs.core.truth_(inst_40176)){
var statearr_40197_40225 = state_40194__$1;
(statearr_40197_40225[(1)] = (8));

} else {
var statearr_40200_40226 = state_40194__$1;
(statearr_40200_40226[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40195 === (1))){
var inst_40165 = cljs.core.vec.call(null,chs);
var inst_40166 = inst_40165;
var state_40194__$1 = (function (){var statearr_40201 = state_40194;
(statearr_40201[(10)] = inst_40166);

return statearr_40201;
})();
var statearr_40202_40227 = state_40194__$1;
(statearr_40202_40227[(2)] = null);

(statearr_40202_40227[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40195 === (4))){
var inst_40166 = (state_40194[(10)]);
var state_40194__$1 = state_40194;
return cljs.core.async.ioc_alts_BANG_.call(null,state_40194__$1,(7),inst_40166);
} else {
if((state_val_40195 === (6))){
var inst_40190 = (state_40194[(2)]);
var state_40194__$1 = state_40194;
var statearr_40203_40228 = state_40194__$1;
(statearr_40203_40228[(2)] = inst_40190);

(statearr_40203_40228[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40195 === (3))){
var inst_40192 = (state_40194[(2)]);
var state_40194__$1 = state_40194;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40194__$1,inst_40192);
} else {
if((state_val_40195 === (2))){
var inst_40166 = (state_40194[(10)]);
var inst_40168 = cljs.core.count.call(null,inst_40166);
var inst_40169 = (inst_40168 > (0));
var state_40194__$1 = state_40194;
if(cljs.core.truth_(inst_40169)){
var statearr_40205_40229 = state_40194__$1;
(statearr_40205_40229[(1)] = (4));

} else {
var statearr_40206_40230 = state_40194__$1;
(statearr_40206_40230[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40195 === (11))){
var inst_40166 = (state_40194[(10)]);
var inst_40183 = (state_40194[(2)]);
var tmp40204 = inst_40166;
var inst_40166__$1 = tmp40204;
var state_40194__$1 = (function (){var statearr_40207 = state_40194;
(statearr_40207[(11)] = inst_40183);

(statearr_40207[(10)] = inst_40166__$1);

return statearr_40207;
})();
var statearr_40208_40231 = state_40194__$1;
(statearr_40208_40231[(2)] = null);

(statearr_40208_40231[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40195 === (9))){
var inst_40174 = (state_40194[(8)]);
var state_40194__$1 = state_40194;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_40194__$1,(11),out,inst_40174);
} else {
if((state_val_40195 === (5))){
var inst_40188 = cljs.core.async.close_BANG_.call(null,out);
var state_40194__$1 = state_40194;
var statearr_40209_40232 = state_40194__$1;
(statearr_40209_40232[(2)] = inst_40188);

(statearr_40209_40232[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40195 === (10))){
var inst_40186 = (state_40194[(2)]);
var state_40194__$1 = state_40194;
var statearr_40210_40233 = state_40194__$1;
(statearr_40210_40233[(2)] = inst_40186);

(statearr_40210_40233[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40195 === (8))){
var inst_40173 = (state_40194[(7)]);
var inst_40174 = (state_40194[(8)]);
var inst_40175 = (state_40194[(9)]);
var inst_40166 = (state_40194[(10)]);
var inst_40178 = (function (){var cs = inst_40166;
var vec__40171 = inst_40173;
var v = inst_40174;
var c = inst_40175;
return ((function (cs,vec__40171,v,c,inst_40173,inst_40174,inst_40175,inst_40166,state_val_40195,c__32217__auto___40224,out){
return (function (p1__40161_SHARP_){
return cljs.core.not_EQ_.call(null,c,p1__40161_SHARP_);
});
;})(cs,vec__40171,v,c,inst_40173,inst_40174,inst_40175,inst_40166,state_val_40195,c__32217__auto___40224,out))
})();
var inst_40179 = cljs.core.filterv.call(null,inst_40178,inst_40166);
var inst_40166__$1 = inst_40179;
var state_40194__$1 = (function (){var statearr_40211 = state_40194;
(statearr_40211[(10)] = inst_40166__$1);

return statearr_40211;
})();
var statearr_40212_40234 = state_40194__$1;
(statearr_40212_40234[(2)] = null);

(statearr_40212_40234[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__32217__auto___40224,out))
;
return ((function (switch__32152__auto__,c__32217__auto___40224,out){
return (function() {
var cljs$core$async$state_machine__32153__auto__ = null;
var cljs$core$async$state_machine__32153__auto____0 = (function (){
var statearr_40216 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_40216[(0)] = cljs$core$async$state_machine__32153__auto__);

(statearr_40216[(1)] = (1));

return statearr_40216;
});
var cljs$core$async$state_machine__32153__auto____1 = (function (state_40194){
while(true){
var ret_value__32154__auto__ = (function (){try{while(true){
var result__32155__auto__ = switch__32152__auto__.call(null,state_40194);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32155__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32155__auto__;
}
break;
}
}catch (e40217){if((e40217 instanceof Object)){
var ex__32156__auto__ = e40217;
var statearr_40218_40235 = state_40194;
(statearr_40218_40235[(5)] = ex__32156__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40194);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40217;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32154__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40236 = state_40194;
state_40194 = G__40236;
continue;
} else {
return ret_value__32154__auto__;
}
break;
}
});
cljs$core$async$state_machine__32153__auto__ = function(state_40194){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__32153__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__32153__auto____1.call(this,state_40194);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__32153__auto____0;
cljs$core$async$state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__32153__auto____1;
return cljs$core$async$state_machine__32153__auto__;
})()
;})(switch__32152__auto__,c__32217__auto___40224,out))
})();
var state__32219__auto__ = (function (){var statearr_40219 = f__32218__auto__.call(null);
(statearr_40219[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32217__auto___40224);

return statearr_40219;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32219__auto__);
});})(c__32217__auto___40224,out))
);


return out;
});

cljs.core.async.merge.cljs$lang$maxFixedArity = 2;
/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce.call(null,cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var args40237 = [];
var len__29964__auto___40286 = arguments.length;
var i__29965__auto___40287 = (0);
while(true){
if((i__29965__auto___40287 < len__29964__auto___40286)){
args40237.push((arguments[i__29965__auto___40287]));

var G__40288 = (i__29965__auto___40287 + (1));
i__29965__auto___40287 = G__40288;
continue;
} else {
}
break;
}

var G__40239 = args40237.length;
switch (G__40239) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40237.length)].join('')));

}
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.call(null,n,ch,null);
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__32217__auto___40290 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32217__auto___40290,out){
return (function (){
var f__32218__auto__ = (function (){var switch__32152__auto__ = ((function (c__32217__auto___40290,out){
return (function (state_40263){
var state_val_40264 = (state_40263[(1)]);
if((state_val_40264 === (7))){
var inst_40245 = (state_40263[(7)]);
var inst_40245__$1 = (state_40263[(2)]);
var inst_40246 = (inst_40245__$1 == null);
var inst_40247 = cljs.core.not.call(null,inst_40246);
var state_40263__$1 = (function (){var statearr_40265 = state_40263;
(statearr_40265[(7)] = inst_40245__$1);

return statearr_40265;
})();
if(inst_40247){
var statearr_40266_40291 = state_40263__$1;
(statearr_40266_40291[(1)] = (8));

} else {
var statearr_40267_40292 = state_40263__$1;
(statearr_40267_40292[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40264 === (1))){
var inst_40240 = (0);
var state_40263__$1 = (function (){var statearr_40268 = state_40263;
(statearr_40268[(8)] = inst_40240);

return statearr_40268;
})();
var statearr_40269_40293 = state_40263__$1;
(statearr_40269_40293[(2)] = null);

(statearr_40269_40293[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40264 === (4))){
var state_40263__$1 = state_40263;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40263__$1,(7),ch);
} else {
if((state_val_40264 === (6))){
var inst_40258 = (state_40263[(2)]);
var state_40263__$1 = state_40263;
var statearr_40270_40294 = state_40263__$1;
(statearr_40270_40294[(2)] = inst_40258);

(statearr_40270_40294[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40264 === (3))){
var inst_40260 = (state_40263[(2)]);
var inst_40261 = cljs.core.async.close_BANG_.call(null,out);
var state_40263__$1 = (function (){var statearr_40271 = state_40263;
(statearr_40271[(9)] = inst_40260);

return statearr_40271;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40263__$1,inst_40261);
} else {
if((state_val_40264 === (2))){
var inst_40240 = (state_40263[(8)]);
var inst_40242 = (inst_40240 < n);
var state_40263__$1 = state_40263;
if(cljs.core.truth_(inst_40242)){
var statearr_40272_40295 = state_40263__$1;
(statearr_40272_40295[(1)] = (4));

} else {
var statearr_40273_40296 = state_40263__$1;
(statearr_40273_40296[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40264 === (11))){
var inst_40240 = (state_40263[(8)]);
var inst_40250 = (state_40263[(2)]);
var inst_40251 = (inst_40240 + (1));
var inst_40240__$1 = inst_40251;
var state_40263__$1 = (function (){var statearr_40274 = state_40263;
(statearr_40274[(10)] = inst_40250);

(statearr_40274[(8)] = inst_40240__$1);

return statearr_40274;
})();
var statearr_40275_40297 = state_40263__$1;
(statearr_40275_40297[(2)] = null);

(statearr_40275_40297[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40264 === (9))){
var state_40263__$1 = state_40263;
var statearr_40276_40298 = state_40263__$1;
(statearr_40276_40298[(2)] = null);

(statearr_40276_40298[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40264 === (5))){
var state_40263__$1 = state_40263;
var statearr_40277_40299 = state_40263__$1;
(statearr_40277_40299[(2)] = null);

(statearr_40277_40299[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40264 === (10))){
var inst_40255 = (state_40263[(2)]);
var state_40263__$1 = state_40263;
var statearr_40278_40300 = state_40263__$1;
(statearr_40278_40300[(2)] = inst_40255);

(statearr_40278_40300[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40264 === (8))){
var inst_40245 = (state_40263[(7)]);
var state_40263__$1 = state_40263;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_40263__$1,(11),out,inst_40245);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__32217__auto___40290,out))
;
return ((function (switch__32152__auto__,c__32217__auto___40290,out){
return (function() {
var cljs$core$async$state_machine__32153__auto__ = null;
var cljs$core$async$state_machine__32153__auto____0 = (function (){
var statearr_40282 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_40282[(0)] = cljs$core$async$state_machine__32153__auto__);

(statearr_40282[(1)] = (1));

return statearr_40282;
});
var cljs$core$async$state_machine__32153__auto____1 = (function (state_40263){
while(true){
var ret_value__32154__auto__ = (function (){try{while(true){
var result__32155__auto__ = switch__32152__auto__.call(null,state_40263);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32155__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32155__auto__;
}
break;
}
}catch (e40283){if((e40283 instanceof Object)){
var ex__32156__auto__ = e40283;
var statearr_40284_40301 = state_40263;
(statearr_40284_40301[(5)] = ex__32156__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40263);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40283;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32154__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40302 = state_40263;
state_40263 = G__40302;
continue;
} else {
return ret_value__32154__auto__;
}
break;
}
});
cljs$core$async$state_machine__32153__auto__ = function(state_40263){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__32153__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__32153__auto____1.call(this,state_40263);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__32153__auto____0;
cljs$core$async$state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__32153__auto____1;
return cljs$core$async$state_machine__32153__auto__;
})()
;})(switch__32152__auto__,c__32217__auto___40290,out))
})();
var state__32219__auto__ = (function (){var statearr_40285 = f__32218__auto__.call(null);
(statearr_40285[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32217__auto___40290);

return statearr_40285;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32219__auto__);
});})(c__32217__auto___40290,out))
);


return out;
});

cljs.core.async.take.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async40310 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async40310 = (function (map_LT_,f,ch,meta40311){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta40311 = meta40311;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async40310.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_40312,meta40311__$1){
var self__ = this;
var _40312__$1 = this;
return (new cljs.core.async.t_cljs$core$async40310(self__.map_LT_,self__.f,self__.ch,meta40311__$1));
});

cljs.core.async.t_cljs$core$async40310.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_40312){
var self__ = this;
var _40312__$1 = this;
return self__.meta40311;
});

cljs.core.async.t_cljs$core$async40310.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async40310.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async40310.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async40310.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async40310.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){
if(typeof cljs.core.async.t_cljs$core$async40313 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async40313 = (function (map_LT_,f,ch,meta40311,_,fn1,meta40314){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta40311 = meta40311;
this._ = _;
this.fn1 = fn1;
this.meta40314 = meta40314;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async40313.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_40315,meta40314__$1){
var self__ = this;
var _40315__$1 = this;
return (new cljs.core.async.t_cljs$core$async40313(self__.map_LT_,self__.f,self__.ch,self__.meta40311,self__._,self__.fn1,meta40314__$1));
});})(___$1))
;

cljs.core.async.t_cljs$core$async40313.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_40315){
var self__ = this;
var _40315__$1 = this;
return self__.meta40314;
});})(___$1))
;

cljs.core.async.t_cljs$core$async40313.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async40313.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;

cljs.core.async.t_cljs$core$async40313.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);
return ((function (f1,___$2,___$1){
return (function (p1__40303_SHARP_){
return f1.call(null,(((p1__40303_SHARP_ == null))?null:self__.f.call(null,p1__40303_SHARP_)));
});
;})(f1,___$2,___$1))
});})(___$1))
;

cljs.core.async.t_cljs$core$async40313.getBasis = ((function (___$1){
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta40311","meta40311",602576442,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async40310","cljs.core.async/t_cljs$core$async40310",316584171,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta40314","meta40314",1647999566,null)], null);
});})(___$1))
;

cljs.core.async.t_cljs$core$async40313.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async40313.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async40313";

cljs.core.async.t_cljs$core$async40313.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__29504__auto__,writer__29505__auto__,opt__29506__auto__){
return cljs.core._write.call(null,writer__29505__auto__,"cljs.core.async/t_cljs$core$async40313");
});})(___$1))
;

cljs.core.async.__GT_t_cljs$core$async40313 = ((function (___$1){
return (function cljs$core$async$map_LT__$___GT_t_cljs$core$async40313(map_LT___$1,f__$1,ch__$1,meta40311__$1,___$2,fn1__$1,meta40314){
return (new cljs.core.async.t_cljs$core$async40313(map_LT___$1,f__$1,ch__$1,meta40311__$1,___$2,fn1__$1,meta40314));
});})(___$1))
;

}

return (new cljs.core.async.t_cljs$core$async40313(self__.map_LT_,self__.f,self__.ch,self__.meta40311,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__28894__auto__ = ret;
if(cljs.core.truth_(and__28894__auto__)){
return !((cljs.core.deref.call(null,ret) == null));
} else {
return and__28894__auto__;
}
})())){
return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else {
return ret;
}
});

cljs.core.async.t_cljs$core$async40310.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async40310.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});

cljs.core.async.t_cljs$core$async40310.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta40311","meta40311",602576442,null)], null);
});

cljs.core.async.t_cljs$core$async40310.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async40310.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async40310";

cljs.core.async.t_cljs$core$async40310.cljs$lang$ctorPrWriter = (function (this__29504__auto__,writer__29505__auto__,opt__29506__auto__){
return cljs.core._write.call(null,writer__29505__auto__,"cljs.core.async/t_cljs$core$async40310");
});

cljs.core.async.__GT_t_cljs$core$async40310 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async40310(map_LT___$1,f__$1,ch__$1,meta40311){
return (new cljs.core.async.t_cljs$core$async40310(map_LT___$1,f__$1,ch__$1,meta40311));
});

}

return (new cljs.core.async.t_cljs$core$async40310(cljs$core$async$map_LT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async40319 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async40319 = (function (map_GT_,f,ch,meta40320){
this.map_GT_ = map_GT_;
this.f = f;
this.ch = ch;
this.meta40320 = meta40320;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async40319.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_40321,meta40320__$1){
var self__ = this;
var _40321__$1 = this;
return (new cljs.core.async.t_cljs$core$async40319(self__.map_GT_,self__.f,self__.ch,meta40320__$1));
});

cljs.core.async.t_cljs$core$async40319.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_40321){
var self__ = this;
var _40321__$1 = this;
return self__.meta40320;
});

cljs.core.async.t_cljs$core$async40319.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async40319.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async40319.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async40319.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async40319.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async40319.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});

cljs.core.async.t_cljs$core$async40319.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map>","map>",1676369295,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta40320","meta40320",521809095,null)], null);
});

cljs.core.async.t_cljs$core$async40319.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async40319.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async40319";

cljs.core.async.t_cljs$core$async40319.cljs$lang$ctorPrWriter = (function (this__29504__auto__,writer__29505__auto__,opt__29506__auto__){
return cljs.core._write.call(null,writer__29505__auto__,"cljs.core.async/t_cljs$core$async40319");
});

cljs.core.async.__GT_t_cljs$core$async40319 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async40319(map_GT___$1,f__$1,ch__$1,meta40320){
return (new cljs.core.async.t_cljs$core$async40319(map_GT___$1,f__$1,ch__$1,meta40320));
});

}

return (new cljs.core.async.t_cljs$core$async40319(cljs$core$async$map_GT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if(typeof cljs.core.async.t_cljs$core$async40325 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async40325 = (function (filter_GT_,p,ch,meta40326){
this.filter_GT_ = filter_GT_;
this.p = p;
this.ch = ch;
this.meta40326 = meta40326;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async40325.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_40327,meta40326__$1){
var self__ = this;
var _40327__$1 = this;
return (new cljs.core.async.t_cljs$core$async40325(self__.filter_GT_,self__.p,self__.ch,meta40326__$1));
});

cljs.core.async.t_cljs$core$async40325.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_40327){
var self__ = this;
var _40327__$1 = this;
return self__.meta40326;
});

cljs.core.async.t_cljs$core$async40325.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async40325.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async40325.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async40325.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async40325.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async40325.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async40325.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.p.call(null,val))){
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});

cljs.core.async.t_cljs$core$async40325.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"filter>","filter>",-37644455,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta40326","meta40326",426406773,null)], null);
});

cljs.core.async.t_cljs$core$async40325.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async40325.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async40325";

cljs.core.async.t_cljs$core$async40325.cljs$lang$ctorPrWriter = (function (this__29504__auto__,writer__29505__auto__,opt__29506__auto__){
return cljs.core._write.call(null,writer__29505__auto__,"cljs.core.async/t_cljs$core$async40325");
});

cljs.core.async.__GT_t_cljs$core$async40325 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async40325(filter_GT___$1,p__$1,ch__$1,meta40326){
return (new cljs.core.async.t_cljs$core$async40325(filter_GT___$1,p__$1,ch__$1,meta40326));
});

}

return (new cljs.core.async.t_cljs$core$async40325(cljs$core$async$filter_GT_,p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_.call(null,cljs.core.complement.call(null,p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var args40328 = [];
var len__29964__auto___40372 = arguments.length;
var i__29965__auto___40373 = (0);
while(true){
if((i__29965__auto___40373 < len__29964__auto___40372)){
args40328.push((arguments[i__29965__auto___40373]));

var G__40374 = (i__29965__auto___40373 + (1));
i__29965__auto___40373 = G__40374;
continue;
} else {
}
break;
}

var G__40330 = args40328.length;
switch (G__40330) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40328.length)].join('')));

}
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.call(null,p,ch,null);
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__32217__auto___40376 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32217__auto___40376,out){
return (function (){
var f__32218__auto__ = (function (){var switch__32152__auto__ = ((function (c__32217__auto___40376,out){
return (function (state_40351){
var state_val_40352 = (state_40351[(1)]);
if((state_val_40352 === (7))){
var inst_40347 = (state_40351[(2)]);
var state_40351__$1 = state_40351;
var statearr_40353_40377 = state_40351__$1;
(statearr_40353_40377[(2)] = inst_40347);

(statearr_40353_40377[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40352 === (1))){
var state_40351__$1 = state_40351;
var statearr_40354_40378 = state_40351__$1;
(statearr_40354_40378[(2)] = null);

(statearr_40354_40378[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40352 === (4))){
var inst_40333 = (state_40351[(7)]);
var inst_40333__$1 = (state_40351[(2)]);
var inst_40334 = (inst_40333__$1 == null);
var state_40351__$1 = (function (){var statearr_40355 = state_40351;
(statearr_40355[(7)] = inst_40333__$1);

return statearr_40355;
})();
if(cljs.core.truth_(inst_40334)){
var statearr_40356_40379 = state_40351__$1;
(statearr_40356_40379[(1)] = (5));

} else {
var statearr_40357_40380 = state_40351__$1;
(statearr_40357_40380[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40352 === (6))){
var inst_40333 = (state_40351[(7)]);
var inst_40338 = p.call(null,inst_40333);
var state_40351__$1 = state_40351;
if(cljs.core.truth_(inst_40338)){
var statearr_40358_40381 = state_40351__$1;
(statearr_40358_40381[(1)] = (8));

} else {
var statearr_40359_40382 = state_40351__$1;
(statearr_40359_40382[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40352 === (3))){
var inst_40349 = (state_40351[(2)]);
var state_40351__$1 = state_40351;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40351__$1,inst_40349);
} else {
if((state_val_40352 === (2))){
var state_40351__$1 = state_40351;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40351__$1,(4),ch);
} else {
if((state_val_40352 === (11))){
var inst_40341 = (state_40351[(2)]);
var state_40351__$1 = state_40351;
var statearr_40360_40383 = state_40351__$1;
(statearr_40360_40383[(2)] = inst_40341);

(statearr_40360_40383[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40352 === (9))){
var state_40351__$1 = state_40351;
var statearr_40361_40384 = state_40351__$1;
(statearr_40361_40384[(2)] = null);

(statearr_40361_40384[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40352 === (5))){
var inst_40336 = cljs.core.async.close_BANG_.call(null,out);
var state_40351__$1 = state_40351;
var statearr_40362_40385 = state_40351__$1;
(statearr_40362_40385[(2)] = inst_40336);

(statearr_40362_40385[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40352 === (10))){
var inst_40344 = (state_40351[(2)]);
var state_40351__$1 = (function (){var statearr_40363 = state_40351;
(statearr_40363[(8)] = inst_40344);

return statearr_40363;
})();
var statearr_40364_40386 = state_40351__$1;
(statearr_40364_40386[(2)] = null);

(statearr_40364_40386[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40352 === (8))){
var inst_40333 = (state_40351[(7)]);
var state_40351__$1 = state_40351;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_40351__$1,(11),out,inst_40333);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__32217__auto___40376,out))
;
return ((function (switch__32152__auto__,c__32217__auto___40376,out){
return (function() {
var cljs$core$async$state_machine__32153__auto__ = null;
var cljs$core$async$state_machine__32153__auto____0 = (function (){
var statearr_40368 = [null,null,null,null,null,null,null,null,null];
(statearr_40368[(0)] = cljs$core$async$state_machine__32153__auto__);

(statearr_40368[(1)] = (1));

return statearr_40368;
});
var cljs$core$async$state_machine__32153__auto____1 = (function (state_40351){
while(true){
var ret_value__32154__auto__ = (function (){try{while(true){
var result__32155__auto__ = switch__32152__auto__.call(null,state_40351);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32155__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32155__auto__;
}
break;
}
}catch (e40369){if((e40369 instanceof Object)){
var ex__32156__auto__ = e40369;
var statearr_40370_40387 = state_40351;
(statearr_40370_40387[(5)] = ex__32156__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40351);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40369;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32154__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40388 = state_40351;
state_40351 = G__40388;
continue;
} else {
return ret_value__32154__auto__;
}
break;
}
});
cljs$core$async$state_machine__32153__auto__ = function(state_40351){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__32153__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__32153__auto____1.call(this,state_40351);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__32153__auto____0;
cljs$core$async$state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__32153__auto____1;
return cljs$core$async$state_machine__32153__auto__;
})()
;})(switch__32152__auto__,c__32217__auto___40376,out))
})();
var state__32219__auto__ = (function (){var statearr_40371 = f__32218__auto__.call(null);
(statearr_40371[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32217__auto___40376);

return statearr_40371;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32219__auto__);
});})(c__32217__auto___40376,out))
);


return out;
});

cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var args40389 = [];
var len__29964__auto___40392 = arguments.length;
var i__29965__auto___40393 = (0);
while(true){
if((i__29965__auto___40393 < len__29964__auto___40392)){
args40389.push((arguments[i__29965__auto___40393]));

var G__40394 = (i__29965__auto___40393 + (1));
i__29965__auto___40393 = G__40394;
continue;
} else {
}
break;
}

var G__40391 = args40389.length;
switch (G__40391) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40389.length)].join('')));

}
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.call(null,p,ch,null);
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.call(null,cljs.core.complement.call(null,p),ch,buf_or_n);
});

cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3;
cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__32217__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32217__auto__){
return (function (){
var f__32218__auto__ = (function (){var switch__32152__auto__ = ((function (c__32217__auto__){
return (function (state_40561){
var state_val_40562 = (state_40561[(1)]);
if((state_val_40562 === (7))){
var inst_40557 = (state_40561[(2)]);
var state_40561__$1 = state_40561;
var statearr_40563_40604 = state_40561__$1;
(statearr_40563_40604[(2)] = inst_40557);

(statearr_40563_40604[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40562 === (20))){
var inst_40527 = (state_40561[(7)]);
var inst_40538 = (state_40561[(2)]);
var inst_40539 = cljs.core.next.call(null,inst_40527);
var inst_40513 = inst_40539;
var inst_40514 = null;
var inst_40515 = (0);
var inst_40516 = (0);
var state_40561__$1 = (function (){var statearr_40564 = state_40561;
(statearr_40564[(8)] = inst_40515);

(statearr_40564[(9)] = inst_40516);

(statearr_40564[(10)] = inst_40514);

(statearr_40564[(11)] = inst_40538);

(statearr_40564[(12)] = inst_40513);

return statearr_40564;
})();
var statearr_40565_40605 = state_40561__$1;
(statearr_40565_40605[(2)] = null);

(statearr_40565_40605[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40562 === (1))){
var state_40561__$1 = state_40561;
var statearr_40566_40606 = state_40561__$1;
(statearr_40566_40606[(2)] = null);

(statearr_40566_40606[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40562 === (4))){
var inst_40502 = (state_40561[(13)]);
var inst_40502__$1 = (state_40561[(2)]);
var inst_40503 = (inst_40502__$1 == null);
var state_40561__$1 = (function (){var statearr_40567 = state_40561;
(statearr_40567[(13)] = inst_40502__$1);

return statearr_40567;
})();
if(cljs.core.truth_(inst_40503)){
var statearr_40568_40607 = state_40561__$1;
(statearr_40568_40607[(1)] = (5));

} else {
var statearr_40569_40608 = state_40561__$1;
(statearr_40569_40608[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40562 === (15))){
var state_40561__$1 = state_40561;
var statearr_40573_40609 = state_40561__$1;
(statearr_40573_40609[(2)] = null);

(statearr_40573_40609[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40562 === (21))){
var state_40561__$1 = state_40561;
var statearr_40574_40610 = state_40561__$1;
(statearr_40574_40610[(2)] = null);

(statearr_40574_40610[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40562 === (13))){
var inst_40515 = (state_40561[(8)]);
var inst_40516 = (state_40561[(9)]);
var inst_40514 = (state_40561[(10)]);
var inst_40513 = (state_40561[(12)]);
var inst_40523 = (state_40561[(2)]);
var inst_40524 = (inst_40516 + (1));
var tmp40570 = inst_40515;
var tmp40571 = inst_40514;
var tmp40572 = inst_40513;
var inst_40513__$1 = tmp40572;
var inst_40514__$1 = tmp40571;
var inst_40515__$1 = tmp40570;
var inst_40516__$1 = inst_40524;
var state_40561__$1 = (function (){var statearr_40575 = state_40561;
(statearr_40575[(8)] = inst_40515__$1);

(statearr_40575[(9)] = inst_40516__$1);

(statearr_40575[(10)] = inst_40514__$1);

(statearr_40575[(14)] = inst_40523);

(statearr_40575[(12)] = inst_40513__$1);

return statearr_40575;
})();
var statearr_40576_40611 = state_40561__$1;
(statearr_40576_40611[(2)] = null);

(statearr_40576_40611[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40562 === (22))){
var state_40561__$1 = state_40561;
var statearr_40577_40612 = state_40561__$1;
(statearr_40577_40612[(2)] = null);

(statearr_40577_40612[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40562 === (6))){
var inst_40502 = (state_40561[(13)]);
var inst_40511 = f.call(null,inst_40502);
var inst_40512 = cljs.core.seq.call(null,inst_40511);
var inst_40513 = inst_40512;
var inst_40514 = null;
var inst_40515 = (0);
var inst_40516 = (0);
var state_40561__$1 = (function (){var statearr_40578 = state_40561;
(statearr_40578[(8)] = inst_40515);

(statearr_40578[(9)] = inst_40516);

(statearr_40578[(10)] = inst_40514);

(statearr_40578[(12)] = inst_40513);

return statearr_40578;
})();
var statearr_40579_40613 = state_40561__$1;
(statearr_40579_40613[(2)] = null);

(statearr_40579_40613[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40562 === (17))){
var inst_40527 = (state_40561[(7)]);
var inst_40531 = cljs.core.chunk_first.call(null,inst_40527);
var inst_40532 = cljs.core.chunk_rest.call(null,inst_40527);
var inst_40533 = cljs.core.count.call(null,inst_40531);
var inst_40513 = inst_40532;
var inst_40514 = inst_40531;
var inst_40515 = inst_40533;
var inst_40516 = (0);
var state_40561__$1 = (function (){var statearr_40580 = state_40561;
(statearr_40580[(8)] = inst_40515);

(statearr_40580[(9)] = inst_40516);

(statearr_40580[(10)] = inst_40514);

(statearr_40580[(12)] = inst_40513);

return statearr_40580;
})();
var statearr_40581_40614 = state_40561__$1;
(statearr_40581_40614[(2)] = null);

(statearr_40581_40614[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40562 === (3))){
var inst_40559 = (state_40561[(2)]);
var state_40561__$1 = state_40561;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40561__$1,inst_40559);
} else {
if((state_val_40562 === (12))){
var inst_40547 = (state_40561[(2)]);
var state_40561__$1 = state_40561;
var statearr_40582_40615 = state_40561__$1;
(statearr_40582_40615[(2)] = inst_40547);

(statearr_40582_40615[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40562 === (2))){
var state_40561__$1 = state_40561;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40561__$1,(4),in$);
} else {
if((state_val_40562 === (23))){
var inst_40555 = (state_40561[(2)]);
var state_40561__$1 = state_40561;
var statearr_40583_40616 = state_40561__$1;
(statearr_40583_40616[(2)] = inst_40555);

(statearr_40583_40616[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40562 === (19))){
var inst_40542 = (state_40561[(2)]);
var state_40561__$1 = state_40561;
var statearr_40584_40617 = state_40561__$1;
(statearr_40584_40617[(2)] = inst_40542);

(statearr_40584_40617[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40562 === (11))){
var inst_40527 = (state_40561[(7)]);
var inst_40513 = (state_40561[(12)]);
var inst_40527__$1 = cljs.core.seq.call(null,inst_40513);
var state_40561__$1 = (function (){var statearr_40585 = state_40561;
(statearr_40585[(7)] = inst_40527__$1);

return statearr_40585;
})();
if(inst_40527__$1){
var statearr_40586_40618 = state_40561__$1;
(statearr_40586_40618[(1)] = (14));

} else {
var statearr_40587_40619 = state_40561__$1;
(statearr_40587_40619[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40562 === (9))){
var inst_40549 = (state_40561[(2)]);
var inst_40550 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);
var state_40561__$1 = (function (){var statearr_40588 = state_40561;
(statearr_40588[(15)] = inst_40549);

return statearr_40588;
})();
if(cljs.core.truth_(inst_40550)){
var statearr_40589_40620 = state_40561__$1;
(statearr_40589_40620[(1)] = (21));

} else {
var statearr_40590_40621 = state_40561__$1;
(statearr_40590_40621[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40562 === (5))){
var inst_40505 = cljs.core.async.close_BANG_.call(null,out);
var state_40561__$1 = state_40561;
var statearr_40591_40622 = state_40561__$1;
(statearr_40591_40622[(2)] = inst_40505);

(statearr_40591_40622[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40562 === (14))){
var inst_40527 = (state_40561[(7)]);
var inst_40529 = cljs.core.chunked_seq_QMARK_.call(null,inst_40527);
var state_40561__$1 = state_40561;
if(inst_40529){
var statearr_40592_40623 = state_40561__$1;
(statearr_40592_40623[(1)] = (17));

} else {
var statearr_40593_40624 = state_40561__$1;
(statearr_40593_40624[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40562 === (16))){
var inst_40545 = (state_40561[(2)]);
var state_40561__$1 = state_40561;
var statearr_40594_40625 = state_40561__$1;
(statearr_40594_40625[(2)] = inst_40545);

(statearr_40594_40625[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40562 === (10))){
var inst_40516 = (state_40561[(9)]);
var inst_40514 = (state_40561[(10)]);
var inst_40521 = cljs.core._nth.call(null,inst_40514,inst_40516);
var state_40561__$1 = state_40561;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_40561__$1,(13),out,inst_40521);
} else {
if((state_val_40562 === (18))){
var inst_40527 = (state_40561[(7)]);
var inst_40536 = cljs.core.first.call(null,inst_40527);
var state_40561__$1 = state_40561;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_40561__$1,(20),out,inst_40536);
} else {
if((state_val_40562 === (8))){
var inst_40515 = (state_40561[(8)]);
var inst_40516 = (state_40561[(9)]);
var inst_40518 = (inst_40516 < inst_40515);
var inst_40519 = inst_40518;
var state_40561__$1 = state_40561;
if(cljs.core.truth_(inst_40519)){
var statearr_40595_40626 = state_40561__$1;
(statearr_40595_40626[(1)] = (10));

} else {
var statearr_40596_40627 = state_40561__$1;
(statearr_40596_40627[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__32217__auto__))
;
return ((function (switch__32152__auto__,c__32217__auto__){
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__32153__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__32153__auto____0 = (function (){
var statearr_40600 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_40600[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__32153__auto__);

(statearr_40600[(1)] = (1));

return statearr_40600;
});
var cljs$core$async$mapcat_STAR__$_state_machine__32153__auto____1 = (function (state_40561){
while(true){
var ret_value__32154__auto__ = (function (){try{while(true){
var result__32155__auto__ = switch__32152__auto__.call(null,state_40561);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32155__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32155__auto__;
}
break;
}
}catch (e40601){if((e40601 instanceof Object)){
var ex__32156__auto__ = e40601;
var statearr_40602_40628 = state_40561;
(statearr_40602_40628[(5)] = ex__32156__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40561);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40601;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32154__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40629 = state_40561;
state_40561 = G__40629;
continue;
} else {
return ret_value__32154__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__32153__auto__ = function(state_40561){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__32153__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__32153__auto____1.call(this,state_40561);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__32153__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__32153__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__32153__auto__;
})()
;})(switch__32152__auto__,c__32217__auto__))
})();
var state__32219__auto__ = (function (){var statearr_40603 = f__32218__auto__.call(null);
(statearr_40603[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32217__auto__);

return statearr_40603;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32219__auto__);
});})(c__32217__auto__))
);

return c__32217__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var args40630 = [];
var len__29964__auto___40633 = arguments.length;
var i__29965__auto___40634 = (0);
while(true){
if((i__29965__auto___40634 < len__29964__auto___40633)){
args40630.push((arguments[i__29965__auto___40634]));

var G__40635 = (i__29965__auto___40634 + (1));
i__29965__auto___40634 = G__40635;
continue;
} else {
}
break;
}

var G__40632 = args40630.length;
switch (G__40632) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40630.length)].join('')));

}
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.call(null,f,in$,null);
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return out;
});

cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var args40637 = [];
var len__29964__auto___40640 = arguments.length;
var i__29965__auto___40641 = (0);
while(true){
if((i__29965__auto___40641 < len__29964__auto___40640)){
args40637.push((arguments[i__29965__auto___40641]));

var G__40642 = (i__29965__auto___40641 + (1));
i__29965__auto___40641 = G__40642;
continue;
} else {
}
break;
}

var G__40639 = args40637.length;
switch (G__40639) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40637.length)].join('')));

}
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.call(null,f,out,null);
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return in$;
});

cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var args40644 = [];
var len__29964__auto___40695 = arguments.length;
var i__29965__auto___40696 = (0);
while(true){
if((i__29965__auto___40696 < len__29964__auto___40695)){
args40644.push((arguments[i__29965__auto___40696]));

var G__40697 = (i__29965__auto___40696 + (1));
i__29965__auto___40696 = G__40697;
continue;
} else {
}
break;
}

var G__40646 = args40644.length;
switch (G__40646) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40644.length)].join('')));

}
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.call(null,ch,null);
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__32217__auto___40699 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32217__auto___40699,out){
return (function (){
var f__32218__auto__ = (function (){var switch__32152__auto__ = ((function (c__32217__auto___40699,out){
return (function (state_40670){
var state_val_40671 = (state_40670[(1)]);
if((state_val_40671 === (7))){
var inst_40665 = (state_40670[(2)]);
var state_40670__$1 = state_40670;
var statearr_40672_40700 = state_40670__$1;
(statearr_40672_40700[(2)] = inst_40665);

(statearr_40672_40700[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40671 === (1))){
var inst_40647 = null;
var state_40670__$1 = (function (){var statearr_40673 = state_40670;
(statearr_40673[(7)] = inst_40647);

return statearr_40673;
})();
var statearr_40674_40701 = state_40670__$1;
(statearr_40674_40701[(2)] = null);

(statearr_40674_40701[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40671 === (4))){
var inst_40650 = (state_40670[(8)]);
var inst_40650__$1 = (state_40670[(2)]);
var inst_40651 = (inst_40650__$1 == null);
var inst_40652 = cljs.core.not.call(null,inst_40651);
var state_40670__$1 = (function (){var statearr_40675 = state_40670;
(statearr_40675[(8)] = inst_40650__$1);

return statearr_40675;
})();
if(inst_40652){
var statearr_40676_40702 = state_40670__$1;
(statearr_40676_40702[(1)] = (5));

} else {
var statearr_40677_40703 = state_40670__$1;
(statearr_40677_40703[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40671 === (6))){
var state_40670__$1 = state_40670;
var statearr_40678_40704 = state_40670__$1;
(statearr_40678_40704[(2)] = null);

(statearr_40678_40704[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40671 === (3))){
var inst_40667 = (state_40670[(2)]);
var inst_40668 = cljs.core.async.close_BANG_.call(null,out);
var state_40670__$1 = (function (){var statearr_40679 = state_40670;
(statearr_40679[(9)] = inst_40667);

return statearr_40679;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40670__$1,inst_40668);
} else {
if((state_val_40671 === (2))){
var state_40670__$1 = state_40670;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40670__$1,(4),ch);
} else {
if((state_val_40671 === (11))){
var inst_40650 = (state_40670[(8)]);
var inst_40659 = (state_40670[(2)]);
var inst_40647 = inst_40650;
var state_40670__$1 = (function (){var statearr_40680 = state_40670;
(statearr_40680[(10)] = inst_40659);

(statearr_40680[(7)] = inst_40647);

return statearr_40680;
})();
var statearr_40681_40705 = state_40670__$1;
(statearr_40681_40705[(2)] = null);

(statearr_40681_40705[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40671 === (9))){
var inst_40650 = (state_40670[(8)]);
var state_40670__$1 = state_40670;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_40670__$1,(11),out,inst_40650);
} else {
if((state_val_40671 === (5))){
var inst_40650 = (state_40670[(8)]);
var inst_40647 = (state_40670[(7)]);
var inst_40654 = cljs.core._EQ_.call(null,inst_40650,inst_40647);
var state_40670__$1 = state_40670;
if(inst_40654){
var statearr_40683_40706 = state_40670__$1;
(statearr_40683_40706[(1)] = (8));

} else {
var statearr_40684_40707 = state_40670__$1;
(statearr_40684_40707[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40671 === (10))){
var inst_40662 = (state_40670[(2)]);
var state_40670__$1 = state_40670;
var statearr_40685_40708 = state_40670__$1;
(statearr_40685_40708[(2)] = inst_40662);

(statearr_40685_40708[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40671 === (8))){
var inst_40647 = (state_40670[(7)]);
var tmp40682 = inst_40647;
var inst_40647__$1 = tmp40682;
var state_40670__$1 = (function (){var statearr_40686 = state_40670;
(statearr_40686[(7)] = inst_40647__$1);

return statearr_40686;
})();
var statearr_40687_40709 = state_40670__$1;
(statearr_40687_40709[(2)] = null);

(statearr_40687_40709[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__32217__auto___40699,out))
;
return ((function (switch__32152__auto__,c__32217__auto___40699,out){
return (function() {
var cljs$core$async$state_machine__32153__auto__ = null;
var cljs$core$async$state_machine__32153__auto____0 = (function (){
var statearr_40691 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_40691[(0)] = cljs$core$async$state_machine__32153__auto__);

(statearr_40691[(1)] = (1));

return statearr_40691;
});
var cljs$core$async$state_machine__32153__auto____1 = (function (state_40670){
while(true){
var ret_value__32154__auto__ = (function (){try{while(true){
var result__32155__auto__ = switch__32152__auto__.call(null,state_40670);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32155__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32155__auto__;
}
break;
}
}catch (e40692){if((e40692 instanceof Object)){
var ex__32156__auto__ = e40692;
var statearr_40693_40710 = state_40670;
(statearr_40693_40710[(5)] = ex__32156__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40670);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40692;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32154__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40711 = state_40670;
state_40670 = G__40711;
continue;
} else {
return ret_value__32154__auto__;
}
break;
}
});
cljs$core$async$state_machine__32153__auto__ = function(state_40670){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__32153__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__32153__auto____1.call(this,state_40670);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__32153__auto____0;
cljs$core$async$state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__32153__auto____1;
return cljs$core$async$state_machine__32153__auto__;
})()
;})(switch__32152__auto__,c__32217__auto___40699,out))
})();
var state__32219__auto__ = (function (){var statearr_40694 = f__32218__auto__.call(null);
(statearr_40694[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32217__auto___40699);

return statearr_40694;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32219__auto__);
});})(c__32217__auto___40699,out))
);


return out;
});

cljs.core.async.unique.cljs$lang$maxFixedArity = 2;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var args40712 = [];
var len__29964__auto___40782 = arguments.length;
var i__29965__auto___40783 = (0);
while(true){
if((i__29965__auto___40783 < len__29964__auto___40782)){
args40712.push((arguments[i__29965__auto___40783]));

var G__40784 = (i__29965__auto___40783 + (1));
i__29965__auto___40783 = G__40784;
continue;
} else {
}
break;
}

var G__40714 = args40712.length;
switch (G__40714) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40712.length)].join('')));

}
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.call(null,n,ch,null);
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__32217__auto___40786 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32217__auto___40786,out){
return (function (){
var f__32218__auto__ = (function (){var switch__32152__auto__ = ((function (c__32217__auto___40786,out){
return (function (state_40752){
var state_val_40753 = (state_40752[(1)]);
if((state_val_40753 === (7))){
var inst_40748 = (state_40752[(2)]);
var state_40752__$1 = state_40752;
var statearr_40754_40787 = state_40752__$1;
(statearr_40754_40787[(2)] = inst_40748);

(statearr_40754_40787[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40753 === (1))){
var inst_40715 = (new Array(n));
var inst_40716 = inst_40715;
var inst_40717 = (0);
var state_40752__$1 = (function (){var statearr_40755 = state_40752;
(statearr_40755[(7)] = inst_40716);

(statearr_40755[(8)] = inst_40717);

return statearr_40755;
})();
var statearr_40756_40788 = state_40752__$1;
(statearr_40756_40788[(2)] = null);

(statearr_40756_40788[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40753 === (4))){
var inst_40720 = (state_40752[(9)]);
var inst_40720__$1 = (state_40752[(2)]);
var inst_40721 = (inst_40720__$1 == null);
var inst_40722 = cljs.core.not.call(null,inst_40721);
var state_40752__$1 = (function (){var statearr_40757 = state_40752;
(statearr_40757[(9)] = inst_40720__$1);

return statearr_40757;
})();
if(inst_40722){
var statearr_40758_40789 = state_40752__$1;
(statearr_40758_40789[(1)] = (5));

} else {
var statearr_40759_40790 = state_40752__$1;
(statearr_40759_40790[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40753 === (15))){
var inst_40742 = (state_40752[(2)]);
var state_40752__$1 = state_40752;
var statearr_40760_40791 = state_40752__$1;
(statearr_40760_40791[(2)] = inst_40742);

(statearr_40760_40791[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40753 === (13))){
var state_40752__$1 = state_40752;
var statearr_40761_40792 = state_40752__$1;
(statearr_40761_40792[(2)] = null);

(statearr_40761_40792[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40753 === (6))){
var inst_40717 = (state_40752[(8)]);
var inst_40738 = (inst_40717 > (0));
var state_40752__$1 = state_40752;
if(cljs.core.truth_(inst_40738)){
var statearr_40762_40793 = state_40752__$1;
(statearr_40762_40793[(1)] = (12));

} else {
var statearr_40763_40794 = state_40752__$1;
(statearr_40763_40794[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40753 === (3))){
var inst_40750 = (state_40752[(2)]);
var state_40752__$1 = state_40752;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40752__$1,inst_40750);
} else {
if((state_val_40753 === (12))){
var inst_40716 = (state_40752[(7)]);
var inst_40740 = cljs.core.vec.call(null,inst_40716);
var state_40752__$1 = state_40752;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_40752__$1,(15),out,inst_40740);
} else {
if((state_val_40753 === (2))){
var state_40752__$1 = state_40752;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40752__$1,(4),ch);
} else {
if((state_val_40753 === (11))){
var inst_40732 = (state_40752[(2)]);
var inst_40733 = (new Array(n));
var inst_40716 = inst_40733;
var inst_40717 = (0);
var state_40752__$1 = (function (){var statearr_40764 = state_40752;
(statearr_40764[(7)] = inst_40716);

(statearr_40764[(8)] = inst_40717);

(statearr_40764[(10)] = inst_40732);

return statearr_40764;
})();
var statearr_40765_40795 = state_40752__$1;
(statearr_40765_40795[(2)] = null);

(statearr_40765_40795[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40753 === (9))){
var inst_40716 = (state_40752[(7)]);
var inst_40730 = cljs.core.vec.call(null,inst_40716);
var state_40752__$1 = state_40752;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_40752__$1,(11),out,inst_40730);
} else {
if((state_val_40753 === (5))){
var inst_40716 = (state_40752[(7)]);
var inst_40717 = (state_40752[(8)]);
var inst_40725 = (state_40752[(11)]);
var inst_40720 = (state_40752[(9)]);
var inst_40724 = (inst_40716[inst_40717] = inst_40720);
var inst_40725__$1 = (inst_40717 + (1));
var inst_40726 = (inst_40725__$1 < n);
var state_40752__$1 = (function (){var statearr_40766 = state_40752;
(statearr_40766[(12)] = inst_40724);

(statearr_40766[(11)] = inst_40725__$1);

return statearr_40766;
})();
if(cljs.core.truth_(inst_40726)){
var statearr_40767_40796 = state_40752__$1;
(statearr_40767_40796[(1)] = (8));

} else {
var statearr_40768_40797 = state_40752__$1;
(statearr_40768_40797[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40753 === (14))){
var inst_40745 = (state_40752[(2)]);
var inst_40746 = cljs.core.async.close_BANG_.call(null,out);
var state_40752__$1 = (function (){var statearr_40770 = state_40752;
(statearr_40770[(13)] = inst_40745);

return statearr_40770;
})();
var statearr_40771_40798 = state_40752__$1;
(statearr_40771_40798[(2)] = inst_40746);

(statearr_40771_40798[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40753 === (10))){
var inst_40736 = (state_40752[(2)]);
var state_40752__$1 = state_40752;
var statearr_40772_40799 = state_40752__$1;
(statearr_40772_40799[(2)] = inst_40736);

(statearr_40772_40799[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40753 === (8))){
var inst_40716 = (state_40752[(7)]);
var inst_40725 = (state_40752[(11)]);
var tmp40769 = inst_40716;
var inst_40716__$1 = tmp40769;
var inst_40717 = inst_40725;
var state_40752__$1 = (function (){var statearr_40773 = state_40752;
(statearr_40773[(7)] = inst_40716__$1);

(statearr_40773[(8)] = inst_40717);

return statearr_40773;
})();
var statearr_40774_40800 = state_40752__$1;
(statearr_40774_40800[(2)] = null);

(statearr_40774_40800[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__32217__auto___40786,out))
;
return ((function (switch__32152__auto__,c__32217__auto___40786,out){
return (function() {
var cljs$core$async$state_machine__32153__auto__ = null;
var cljs$core$async$state_machine__32153__auto____0 = (function (){
var statearr_40778 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_40778[(0)] = cljs$core$async$state_machine__32153__auto__);

(statearr_40778[(1)] = (1));

return statearr_40778;
});
var cljs$core$async$state_machine__32153__auto____1 = (function (state_40752){
while(true){
var ret_value__32154__auto__ = (function (){try{while(true){
var result__32155__auto__ = switch__32152__auto__.call(null,state_40752);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32155__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32155__auto__;
}
break;
}
}catch (e40779){if((e40779 instanceof Object)){
var ex__32156__auto__ = e40779;
var statearr_40780_40801 = state_40752;
(statearr_40780_40801[(5)] = ex__32156__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40752);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40779;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32154__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40802 = state_40752;
state_40752 = G__40802;
continue;
} else {
return ret_value__32154__auto__;
}
break;
}
});
cljs$core$async$state_machine__32153__auto__ = function(state_40752){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__32153__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__32153__auto____1.call(this,state_40752);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__32153__auto____0;
cljs$core$async$state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__32153__auto____1;
return cljs$core$async$state_machine__32153__auto__;
})()
;})(switch__32152__auto__,c__32217__auto___40786,out))
})();
var state__32219__auto__ = (function (){var statearr_40781 = f__32218__auto__.call(null);
(statearr_40781[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32217__auto___40786);

return statearr_40781;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32219__auto__);
});})(c__32217__auto___40786,out))
);


return out;
});

cljs.core.async.partition.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var args40803 = [];
var len__29964__auto___40877 = arguments.length;
var i__29965__auto___40878 = (0);
while(true){
if((i__29965__auto___40878 < len__29964__auto___40877)){
args40803.push((arguments[i__29965__auto___40878]));

var G__40879 = (i__29965__auto___40878 + (1));
i__29965__auto___40878 = G__40879;
continue;
} else {
}
break;
}

var G__40805 = args40803.length;
switch (G__40805) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40803.length)].join('')));

}
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.call(null,f,ch,null);
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__32217__auto___40881 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32217__auto___40881,out){
return (function (){
var f__32218__auto__ = (function (){var switch__32152__auto__ = ((function (c__32217__auto___40881,out){
return (function (state_40847){
var state_val_40848 = (state_40847[(1)]);
if((state_val_40848 === (7))){
var inst_40843 = (state_40847[(2)]);
var state_40847__$1 = state_40847;
var statearr_40849_40882 = state_40847__$1;
(statearr_40849_40882[(2)] = inst_40843);

(statearr_40849_40882[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40848 === (1))){
var inst_40806 = [];
var inst_40807 = inst_40806;
var inst_40808 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_40847__$1 = (function (){var statearr_40850 = state_40847;
(statearr_40850[(7)] = inst_40807);

(statearr_40850[(8)] = inst_40808);

return statearr_40850;
})();
var statearr_40851_40883 = state_40847__$1;
(statearr_40851_40883[(2)] = null);

(statearr_40851_40883[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40848 === (4))){
var inst_40811 = (state_40847[(9)]);
var inst_40811__$1 = (state_40847[(2)]);
var inst_40812 = (inst_40811__$1 == null);
var inst_40813 = cljs.core.not.call(null,inst_40812);
var state_40847__$1 = (function (){var statearr_40852 = state_40847;
(statearr_40852[(9)] = inst_40811__$1);

return statearr_40852;
})();
if(inst_40813){
var statearr_40853_40884 = state_40847__$1;
(statearr_40853_40884[(1)] = (5));

} else {
var statearr_40854_40885 = state_40847__$1;
(statearr_40854_40885[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40848 === (15))){
var inst_40837 = (state_40847[(2)]);
var state_40847__$1 = state_40847;
var statearr_40855_40886 = state_40847__$1;
(statearr_40855_40886[(2)] = inst_40837);

(statearr_40855_40886[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40848 === (13))){
var state_40847__$1 = state_40847;
var statearr_40856_40887 = state_40847__$1;
(statearr_40856_40887[(2)] = null);

(statearr_40856_40887[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40848 === (6))){
var inst_40807 = (state_40847[(7)]);
var inst_40832 = inst_40807.length;
var inst_40833 = (inst_40832 > (0));
var state_40847__$1 = state_40847;
if(cljs.core.truth_(inst_40833)){
var statearr_40857_40888 = state_40847__$1;
(statearr_40857_40888[(1)] = (12));

} else {
var statearr_40858_40889 = state_40847__$1;
(statearr_40858_40889[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40848 === (3))){
var inst_40845 = (state_40847[(2)]);
var state_40847__$1 = state_40847;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40847__$1,inst_40845);
} else {
if((state_val_40848 === (12))){
var inst_40807 = (state_40847[(7)]);
var inst_40835 = cljs.core.vec.call(null,inst_40807);
var state_40847__$1 = state_40847;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_40847__$1,(15),out,inst_40835);
} else {
if((state_val_40848 === (2))){
var state_40847__$1 = state_40847;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40847__$1,(4),ch);
} else {
if((state_val_40848 === (11))){
var inst_40811 = (state_40847[(9)]);
var inst_40815 = (state_40847[(10)]);
var inst_40825 = (state_40847[(2)]);
var inst_40826 = [];
var inst_40827 = inst_40826.push(inst_40811);
var inst_40807 = inst_40826;
var inst_40808 = inst_40815;
var state_40847__$1 = (function (){var statearr_40859 = state_40847;
(statearr_40859[(7)] = inst_40807);

(statearr_40859[(8)] = inst_40808);

(statearr_40859[(11)] = inst_40827);

(statearr_40859[(12)] = inst_40825);

return statearr_40859;
})();
var statearr_40860_40890 = state_40847__$1;
(statearr_40860_40890[(2)] = null);

(statearr_40860_40890[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40848 === (9))){
var inst_40807 = (state_40847[(7)]);
var inst_40823 = cljs.core.vec.call(null,inst_40807);
var state_40847__$1 = state_40847;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_40847__$1,(11),out,inst_40823);
} else {
if((state_val_40848 === (5))){
var inst_40811 = (state_40847[(9)]);
var inst_40815 = (state_40847[(10)]);
var inst_40808 = (state_40847[(8)]);
var inst_40815__$1 = f.call(null,inst_40811);
var inst_40816 = cljs.core._EQ_.call(null,inst_40815__$1,inst_40808);
var inst_40817 = cljs.core.keyword_identical_QMARK_.call(null,inst_40808,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var inst_40818 = (inst_40816) || (inst_40817);
var state_40847__$1 = (function (){var statearr_40861 = state_40847;
(statearr_40861[(10)] = inst_40815__$1);

return statearr_40861;
})();
if(cljs.core.truth_(inst_40818)){
var statearr_40862_40891 = state_40847__$1;
(statearr_40862_40891[(1)] = (8));

} else {
var statearr_40863_40892 = state_40847__$1;
(statearr_40863_40892[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40848 === (14))){
var inst_40840 = (state_40847[(2)]);
var inst_40841 = cljs.core.async.close_BANG_.call(null,out);
var state_40847__$1 = (function (){var statearr_40865 = state_40847;
(statearr_40865[(13)] = inst_40840);

return statearr_40865;
})();
var statearr_40866_40893 = state_40847__$1;
(statearr_40866_40893[(2)] = inst_40841);

(statearr_40866_40893[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40848 === (10))){
var inst_40830 = (state_40847[(2)]);
var state_40847__$1 = state_40847;
var statearr_40867_40894 = state_40847__$1;
(statearr_40867_40894[(2)] = inst_40830);

(statearr_40867_40894[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40848 === (8))){
var inst_40811 = (state_40847[(9)]);
var inst_40807 = (state_40847[(7)]);
var inst_40815 = (state_40847[(10)]);
var inst_40820 = inst_40807.push(inst_40811);
var tmp40864 = inst_40807;
var inst_40807__$1 = tmp40864;
var inst_40808 = inst_40815;
var state_40847__$1 = (function (){var statearr_40868 = state_40847;
(statearr_40868[(14)] = inst_40820);

(statearr_40868[(7)] = inst_40807__$1);

(statearr_40868[(8)] = inst_40808);

return statearr_40868;
})();
var statearr_40869_40895 = state_40847__$1;
(statearr_40869_40895[(2)] = null);

(statearr_40869_40895[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__32217__auto___40881,out))
;
return ((function (switch__32152__auto__,c__32217__auto___40881,out){
return (function() {
var cljs$core$async$state_machine__32153__auto__ = null;
var cljs$core$async$state_machine__32153__auto____0 = (function (){
var statearr_40873 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_40873[(0)] = cljs$core$async$state_machine__32153__auto__);

(statearr_40873[(1)] = (1));

return statearr_40873;
});
var cljs$core$async$state_machine__32153__auto____1 = (function (state_40847){
while(true){
var ret_value__32154__auto__ = (function (){try{while(true){
var result__32155__auto__ = switch__32152__auto__.call(null,state_40847);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32155__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32155__auto__;
}
break;
}
}catch (e40874){if((e40874 instanceof Object)){
var ex__32156__auto__ = e40874;
var statearr_40875_40896 = state_40847;
(statearr_40875_40896[(5)] = ex__32156__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40847);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40874;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32154__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40897 = state_40847;
state_40847 = G__40897;
continue;
} else {
return ret_value__32154__auto__;
}
break;
}
});
cljs$core$async$state_machine__32153__auto__ = function(state_40847){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__32153__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__32153__auto____1.call(this,state_40847);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__32153__auto____0;
cljs$core$async$state_machine__32153__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__32153__auto____1;
return cljs$core$async$state_machine__32153__auto__;
})()
;})(switch__32152__auto__,c__32217__auto___40881,out))
})();
var state__32219__auto__ = (function (){var statearr_40876 = f__32218__auto__.call(null);
(statearr_40876[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32217__auto___40881);

return statearr_40876;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32219__auto__);
});})(c__32217__auto___40881,out))
);


return out;
});

cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3;

//# sourceMappingURL=async.js.map