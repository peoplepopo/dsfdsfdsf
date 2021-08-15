"use strict";
function LinkedList(){
  this.end=this;
}
var p=LinkedList.prototype;
p.length=0;
p[0]=false;
p.clear=function(){
  delete this.length;
  delete this[0];
  return this.end=this;
};
p.push=function(){
  var l=arguments.length,x=0;
  while(x<l)this.end=this.end[0]=[false,arguments[x++]];
  return this.length+=l;
};
p.unshift=function(){
  var l=arguments.length,x=0,item=this;
  while(x<l)item=item[0]=[item[0],arguments[x++]];
  this.length||(this.end=item);
  return this.length+=l;
};
p.forEach=function(f){
  var item=this;
  while(item=item[0])f(item[1]);
};
p.reduce=function(f){
  if(!this[0]){
    if(arguments.length>1)return arguments[1];
    throw TypeError("trying to reduce empty LinkedList without x");
  }
  var x,item;
  if(arguments.length>1){
    x=arguments[1];
    item=this;
  }else{
    x=this[0][1];
    item=this[0];
  }
  while(item=item[0])x=f(x,item[1]);
  return x;
};
p.filter=function(f){
  var ll=new LinkedList(),item=this;
  while(item=item[0])if(f(item[1])){
    ll.end=ll.end[0]=[false,item[1]];
    ll.length++;
  }
  return ll;
};
p.filterInPlace=function(f){
  var item=this;
  while(item[0])if(f(item[0][1]))item=item[0];else{
    item[0]=item[0][0];
    this.length--;
  }
  this.end=item;
  return this;
};
p.map=function(f){
  var ll=new LinkedList(),item=this;
  while(item=item[0])ll.end=ll.end[0]=[false,f(item[1])];
  ll.length=this.length;
  return ll;
};
p.mapInPlace=function(f){
  var item=this;
  while(item=item[0])item[1]=f(item[1]);
  return this;
};
p.filterMap=function(f){
  var ll=new LinkedList(),item=this,x;
  while(item=item[0])if(x=f(item[1])){
    ll.end=ll.end[0]=[false,x];
    ll.length++;
  }
  return ll;
};
p.filterMapInPlace=function(f){
  var item=this;
  while(item[0])if(item[0][1]=f(item[0][1]))item=item[0];else{
    item[0]=item[0][0];
    this.length--;
  }
  this.end=item;
  return this;
};
p.reverse=function(){
  if(this.length>1){
    var item=this[0],next,prev=false;
    do{
      next=item[0];
      item[0]=prev;
      prev=item;
    }while(item=next);
    this.end=this[0];
    this[0]=prev;
  }
  return this;
};
p.every=function(f){
  var item=this;
  while(item=item[0])if(!f(item[1]))return false;
  return true;
};
p.some=function(f){
  var item=this;
  while(item=item[0])if(f(item[1]))return true;
  return false;
};
p.shift=function(){
  var x;
  switch(this.length){
    case 0:
      return;
    case 1:
      x=this[0][1];
      this.clear();
      return x;
    default:
      x=this[0][1];
      this[0]=this[0][0];
      this.length--;
      return x;
  }
};
p[Symbol.iterator]=function(){
  return new LinkedListIterator(this);
};
function LinkedListIterator(ll){
  this.item=ll;
}
p=LinkedListIterator.prototype;
p.next=function(){
  if(!this.item[0])return {"done":true};
  this.item=this.item[0];
  return {
    "value":this.item[1],
    "done":false
  };
};
p[Symbol.iterator]=function(){
  return this;
};
exports.LinkedList=LinkedList;
exports.LinkedListIterator=LinkedListIterator;