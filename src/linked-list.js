const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        var node = new Node(data,null,null);
        if (this.length === 0) {
            this._head = node;
            this._tail = node;
            this._head.next = this._tail;
            this._tail.prev = this._head;
        }
        else if (this.length === 1) {
            this._tail = node;
            this._head.next = this._tail;
            this._tail.prev = this._head;
        } 
        else {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        }
        this.length++;
        return this;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        if (index >= 0 && index < this.length) {
            var node = this._head;
            while (index--) {
                node = node.next;
            }
            return node.data;
        }
    }

    insertAt(index, data) {
        var insertedNode = new Node(data,null,null);
        insertedNode.data = data;
        if(index >= 0 && index <= this.length) {
            if(index == 0){
                insertedNode.next = this._head;
                this._head.prev = insertedNode;
                this._head = insertedNode;
                this.length++;
            }
            else if(index == this.length) {
                this._tail.next = insertedNode;
                insertedNode.prev = this._tail;
                this._tail = insertedNode;
                this.length++;
            }
            else {
                var node = this._head;
                var prevNode = new Node();
                while(index--){
                    node = node.next;
                }
                prevNode = node.prev;
                prevNode.next = insertedNode;
                insertedNode.prev = prevNode;
                insertedNode.next = node;
                node.prev = insertedNode;
                this.length++;
            }
        }
        return this;
    }

    isEmpty() {
        return this.length ? false: true;
    }

    clear() {
        while(this.length > 0) {
            this._tail.next = null;
            this._tail.prev = null;
            this._tail.data = null;
            this.length--;
        }
        this._head.prev = null;
        this._head.next = null;
        this._head.data = null;
        return this;
    }

    deleteAt(index) {
        var node = this._head;
        if (index >= 0 && index <= this.length) {
            if (index == 0) {
                this._head = this._head.next;
                this.length--;
            }
            else if (index == this.length) {
                this._tail = this._tail.prev;
                this.length--;
            }
            else {
                var prevNode = new Node();
                while (index--) {
                    node = node.next;
                }
                node.prev.next = node.next;
                node.next.prev = node.prev;
                this.length--;
            }
        }
        return this;
    }

    reverse() {
        var temp = new Node(),
            node = this._head;
        if (this.length > 1) {
            while (node != null) {
                temp = node.prev;
                node.prev = node.next;
                node.next = temp;
                node = node.prev;
            }

            if (temp != null) {
                this._tail = this._head;
                this._head = temp.prev;
            }
        }
        return this;
    }

    indexOf(data) {
        var node = this._head,
            counter = 0;
        while (node.data != data && counter <= this.length) {
            node = node.next;
            counter++;
        }
        if (counter > this.length) {
            return -1;
         }
        else {
            return counter;
        }
    }
}

module.exports = LinkedList;
