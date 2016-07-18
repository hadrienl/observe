# Usage

    import {State} from 'state';
    
    const state = new State();

    const off = state.observe('foo', (newVal, oldVal) => console.log(newVal, oldVal));
    
    state.foo = 'bar'; // console => 'bar' undefined
    state.foo = 'babar'; // console => 'babar' 'bar'

    off();
    
    state.foo = 'foo'; // nothing

