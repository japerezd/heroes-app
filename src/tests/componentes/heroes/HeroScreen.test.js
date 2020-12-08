import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { HeroScreen } from '../../../components/heroes/HeroScreen';


describe('Pruebas en <HeroScreen />', () => {

    const history = {
        length: 10,
        goBack: jest.fn(),
        push: jest.fn()
    }
    
    
    test('debe mostrar el componente redirect si no hay argumentos en el URL ', () => {
        const wrapper = mount(
            // argumento con el url que necesito enviar
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen 
                    history={history}
                />
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();
    });

    test('debe mostrar un hero si el parametro existe y se encuentra', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
            {/* Se utiliza la misma ruta que se tiene en el DashboardRoutes */}
                <Route path="/hero/:heroeId" component={HeroScreen}/>
            </MemoryRouter>
        );

        expect(wrapper.find('.row').exists()).toBe(true);
    })
    
    test('debe regresar a la pantalla anterior con PUSH', () => {
        
        const history = {
            // checar que en el heroscreen se maneja para length <=2 push
            length: 1,
            goBack: jest.fn(),
            push: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId" 
                    // este usa history directamente del argumento del componente
                    component={() => <HeroScreen history={history} />}
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();
        expect(history.push).toHaveBeenCalledWith('/');
        expect(history.goBack).not.toHaveBeenCalled();
    });

    test('debe regresar a la pantalla anterior GOBACK', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId" 
                    // este usa history directamente del argumento del componente
                    component={() => <HeroScreen history={history} />}
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();
        expect(history.goBack).toHaveBeenCalled();
        expect(history.push).not.toHaveBeenCalled();
    });

    test('debe llamar el redirect si el hero no existe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider1238748']}>
                <Route 
                    path="/hero/:heroeId" 
                    // este usa history directamente del argumento del componente
                    component={() => <HeroScreen history={history} />}
                />
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe('');
    })
    
    
    
})
