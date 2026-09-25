// Acknowledgement - based on Andy Gill's Haskell `Text.Dot`

type NodeId = string | number


type ModelElement =
    | { kind: "node"; nid: NodeId }
    | { kind: "connector"; cfrom: NodeId; cto: NodeId }



function show(x: NodeId): string;
function show(x: ModelElement): string;
function show(x: ModelElement | NodeId): string {
    if (typeof x === "object") { 
        if (x.kind === "node") {
            return show(x.nid) + ";"
        } else if (x.kind === "connector") {
            return `${show(x.cfrom)} -> ${show(x.cto)}`
        } else {
            return ""
        }
    } else if (typeof x === "string") {
        return x
    } else {
        return `u${x}`
    }
}

let e1: ModelElement = {kind: "node", nid : 1}  
let e2: ModelElement = {kind: "node", nid : 2}  

let e3: ModelElement = {kind: "connector", cfrom : 1, cto:2}  

console.log(show(e1))
console.log(show(e2))
console.log(show(e3))


type Dot<A> = (st: number, w: Array<ModelElement>) => {state: number, w: Array<ModelElement>, ans: A};


function runDot<A>(fn: Dot<A>): {state: number, w: Array<ModelElement>, ans: A} { 
    return fn(1, [])
}

function outputDot<A>(fn: Dot<A>): string {
    let ans = runDot(fn);
    let lines = ans.w.map(show).join("\n")
    return lines

}

function getDot<A>(fn: Dot<A>, ns: number, w: Array<ModelElement>): {state: number, w: Array<ModelElement>, ans: A} { 
    return fn(ns, w)
}

function pure<A>(a: A): Dot<A>;
function pure<A>(a: A) { 
    return function(st: number, w: Array<ModelElement>) {
        return {state: st, w: w, ans: a}
    }
}


function fmap<A, B>(func: (a: A) => B, m: Dot<A>): Dot<B> { 
    return function(st: number, w: Array<ModelElement>) {
        let {state: st1, w: w1, ans: a} = getDot(m, st, w);
        let b = func(a);
        return {state: st1, w: w1, ans: b}
    }
}

function ap<A, B>(mfunc: Dot<(a: A) => B>, ma: Dot<A>): Dot<B> { 
    return function(st: number, w: Array<ModelElement>) {
        let {state: st1, w: w1, ans: f1} = getDot(mfunc, st, w);
        let {state: st2, w: w2, ans: a} = getDot(ma, st1, w1);
        let b = f1(a);
        return {state: st2, w: w2, ans: b}
    }
}

function liftA2<A, B, C>(fn: (a: A, b: B) => C, ma: Dot<A>, mb: Dot<B>): Dot<C> {
    let step1 = fmap(function(a: A) { return function(b: B) { return fn(a, b) }}, ma)
    return ap(step1, mb)
}


function seqLeft<A, B>(ma: Dot<A>, mb: Dot<B>): Dot<A> {
    return liftA2(function(a: A, b: B) { return a }, ma, mb)
}

function seqRight<A, B>(ma: Dot<A>, mb: Dot<B>): Dot<B> {
    return liftA2(function(a: A, b: B) { return b }, ma, mb)
}

function bind<A, B>(func: (a: A) => Dot<B>, ma: Dot<A>): Dot<B> { 
    return function(st: number, w: Array<ModelElement>) {
        let {state: st1, w: w1, ans: a} = getDot(ma, st, w);
        return getDot(func(a), st1, w1)
    }
}

function flatMap<A, B>(ma: Dot<A>, func: (a: A) => Dot<B>): Dot<B> { 
    return bind(func, ma)
}


function node(): Dot<NodeId> {
    return function(st: number, w: Array<ModelElement>) {
        let nid = `u${st}`
        let node1 : ModelElement = {kind: "node", nid : nid} 
        return {state: st+1, w: w.concat(node1), ans: nid}
    }
}

function userNode(nid: NodeId): Dot<NodeId> {
    return function(st: number, w: Array<ModelElement>) {
        let node1 : ModelElement = {kind: "node", nid : nid} 
        return {state: st+1, w: w.concat(node1), ans: nid}
    }
}

function edge(n1: NodeId, n2: NodeId): Dot<null> {
    return function(st: number, w: Array<ModelElement>) {
        let edge1 : ModelElement = {kind: "connector", cfrom : n1, cto: n2} 
        return {state: st+1, w: w.concat(edge1), ans: null}
    }
}


let prog1: Dot<null> = (
    flatMap(userNode("box"), 
            function(n1: NodeId) { return flatMap(userNode("disc"), function(n2: NodeId) { return edge(n1,n2) })}))

console.log(outputDot(prog1))


