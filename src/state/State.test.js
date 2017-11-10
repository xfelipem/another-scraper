import State from './State';

describe('State:', () => {
    test('La key "estado" debe tener el valor "de prueba"', () => {
        const testObj = { estado: 'de prueba' };
        let state = new State(testObj);

        expect(state.get('estado')).toBe('de prueba');
    });

    test('El objeto de prueba debe ser { estado: "de prueba" }', () => {
        const testObj = { estado: 'de prueba' };
        let state = new State();
        
        state.set(testObj)
        expect(state.get()).toEqual(testObj);
    });
});