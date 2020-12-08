import { mount } from 'enzyme';
import { AuthContext } from '../../../auth/AuthContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';


describe('Pruebas en <LoginScreen />', () => {
    
    const contextValue = {
        dispatch: jest.fn(),
        user:{
            name: 'Beto',
            logged: false
        }
    }

    const history = {
        replace: jest.fn()
    }

    const wrapper = mount(
        <AuthContext.Provider value = { contextValue}>
            <LoginScreen history={history}/>
        </AuthContext.Provider>
    )
    
    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })


    test('debe realizar el dispatch y la navegacion', () => {
        const handleClick = wrapper.find('button').prop('onClick');

        handleClick();

        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload:{
                name: 'Beto'
            }
        });

        expect(history.replace).toHaveBeenCalledWith('/');

        localStorage.setItem('lastPath','/dc');
        handleClick();
        expect(history.replace).toHaveBeenCalledWith('/dc');
    })
    // REALIZAR EN MOTION COMO VERIFICAR QUE SE LLAME EL LOCALSTORAGE CON EL ARGUMENTO
    

})
