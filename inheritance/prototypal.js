// Prototypal inheritance

var parent = {
    value: "parentValue",
    commanValue: "commonValue",
    obj:  {
        value: "parent objvalue"
    },
    walk: function() {
        console.log("Walking parent");
    }
};

var child = Object.create(parent);
child.value = "childValue";
child.walk = function() {
    console.log("Walking child");
}

console.log("PARENT: value ", parent.value);
console.log("PARENT: commanValue ", parent.commanValue);
console.log("PARENT: objectValue ", parent.obj.value);
console.log("PARENT: walk ")
parent.walk();

child.obj.value = "child objvalue";

console.log("PARENT: objectValue ", parent.obj.value);
console.log("CHILD: objectValue ", child.obj.value);

console.log("CHILD: value ", child.value);
console.log("CHILD: commanValue ", child.commanValue);
console.log("CHILD: walk ");
child.walk();

var grandChild = Object.create(child);
console.log("GRANDCHILD: walk ");
grandChild.walk();

// Function constructor
function Dog(name) {
    this.name = name;
    console.log("Initializing Dog", this);
};

var myDog = new Dog('Tommy');
console.log("myDog", myDog);
