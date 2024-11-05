import React from 'react';
import GraphicPizza from '../../Components/Graficos/GraphicPizza';
import GraphicBar from '../../Components/Graficos/GraphicBar';
import { Container, GraphicWrapper } from './styles';
import { useTheme } from '../../Contexts/ThemeContext';

const Home = () => {
    const { isDarkMode } = useTheme();
    return (
        <Container $isDarkMode={isDarkMode}>
            <GraphicWrapper>
                <GraphicPizza />
            </GraphicWrapper>
            <GraphicWrapper>
                <GraphicBar />
            </GraphicWrapper>
        </Container>
    );
};

export default Home;
