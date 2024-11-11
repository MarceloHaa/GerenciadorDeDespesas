import React from 'react';
import GraphicPizza from '../../Components/Graphic/GraphicPizza';
import GraphicBar from '../../Components/Graphic/GraphicBar';
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
