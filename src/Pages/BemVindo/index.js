import React from 'react';
import { PiggyBank, Wallet, CreditCard, DollarSign } from 'lucide-react';

import logoImage from '../../img/logo.png';
import backgroundImage from '../../img/fundo1.png';
import feature1Image from '../../img/card-3.png';
import feature2Image from '../../img/card-2.png';

import {
    Container,
    Navbar,
    NavbarContent,
    NavbarInner,
    LogoContainer,
    Logo,
    NavLinks,
    StyledLink,
    HeroSection,
    HeroContent,
    HeroTitle,
    HeroSubtitle,
    CardsSection,
    CardsGrid,
    Card,
    CardIcon,
    CardTitle,
    CardDescription,
    ImagesSection,
    ImagesGrid,
    ImageContainer,
    FeatureImage,
} from './styles';

const WelcomePage = () => {
    const cards = [
        {
            icon: PiggyBank,
            title: 'Economize',
            description: 'Controle seus gastos',
        },
        { icon: Wallet, title: 'Organize', description: 'Categorize despesas' },
        {
            icon: CreditCard,
            title: 'Planeje',
            description: 'Defina orçamentos',
        },
        {
            icon: DollarSign,
            title: 'Analize',
            description: 'Visualize relatórios',
        },
    ];

    return (
        <Container>
            <Navbar>
                <NavbarContent>
                    <NavbarInner>
                        <LogoContainer>
                            <Logo src={logoImage} alt="Logo" loading="lazy" />
                        </LogoContainer>
                        <NavLinks>
                            <StyledLink to="/login">Login</StyledLink>
                            <StyledLink to="/cadastrar">Cadastrar</StyledLink>
                        </NavLinks>
                    </NavbarInner>
                </NavbarContent>
            </Navbar>

            <HeroSection style={{ backgroundImage: `url(${backgroundImage})` }}>
                <HeroContent>
                    <HeroTitle>Bem vindo</HeroTitle>
                    <HeroSubtitle>Gerenciador de Despesas</HeroSubtitle>
                </HeroContent>
            </HeroSection>

            <CardsSection>
                <CardsGrid>
                    {cards.map((card, index) => (
                        <Card key={index}>
                            <CardIcon>
                                <card.icon />
                            </CardIcon>
                            <CardTitle>{card.title}</CardTitle>
                            <CardDescription>
                                {card.description}
                            </CardDescription>
                        </Card>
                    ))}
                </CardsGrid>
            </CardsSection>

            <ImagesSection>
                <ImagesGrid>
                    <ImageContainer>
                        <FeatureImage
                            src={feature1Image}
                            alt="Feature 1"
                            loading="lazy"
                        />
                    </ImageContainer>
                    <ImageContainer>
                        <FeatureImage
                            src={feature2Image}
                            alt="Feature 2"
                            loading="lazy"
                        />
                    </ImageContainer>
                </ImagesGrid>
            </ImagesSection>
        </Container>
    );
};

export default WelcomePage;
