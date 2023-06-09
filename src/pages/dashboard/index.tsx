import Image from 'next/image';
import styled, { DefaultTheme, ThemeProvider } from "styled-components";
import ResponsiveAppBar from '../../components/navbar/navbar';
import light from "../../styles/themes/light";
import dark from "../../styles/themes/dark";
import GlobalStyle from "../../styles/globals";
import usePeristedState from "../../utils/usePersistedState";
import PermisssionGate from '@/components/permission/PermissionGate';

export const Section = styled.section`
  background: ${props => props.theme.colors.background};
  padding: 5rem 0;
`;

export const Container = styled.div`
  padding: 0 2rem;
`;

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  @media screen and (max-width: 1127px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 760px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Card = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 20px;
`;

export const CardContainer = styled.article`
  .flex{
    display: flex
  }

  .novidades{
    background-color: #c8facd;
    color: #2F3287;
    padding: 30px;
    border-radius: 15px;

    h2{
        font-size: 30px;
        margin-left: 30px;
    }

  }

  .meli{
    background-color: #FEE600;
    color: #2F3287;
    padding: 30px;
    border-radius: 15px;

    p{
        margin-top: 15px;
        margin-left: 30px;
        font-size: 20px;
    }
  }

  .shop{
    background-color: #EF4C2B;
    color: #2F3287;
    padding: 30px;
    border-radius: 15px;

    p{
        margin-top: 15px;
        margin-left: 90px;
        font-size: 20px;
    }
  }

  .newpro{
    background-color: #009EF7;
    color: #FFFF;
    padding: 30px;
    border-radius: 15px;

    h2{
        font-size: 30px;
        margin-left: 30px;
    }

    p{
        margin-top: 15px;
        margin-left: 30px;
        font-size: 20px;
    }
  }

  .total{
    background-color: #FFFFFF;
    color: #000000;
    padding: 30px;
    border-radius: 15px;

    h2{
        font-size: 30px;
        margin-left: 30px;
    }

    p{
        margin-top: 15px;
        margin-left: 30px;
        font-size: 20px;
    }
  }

  .grafic{
    width: 100%;
    border-style: solid;
    border: #000000;
  }
`;

export default function Dashboard(){
    const [theme, setTheme] = usePeristedState<DefaultTheme>('theme', light);

    const toggleTheme = () => {
      setTheme(theme.title === 'light' ? dark : light);
    };
    return(
        <>
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <ResponsiveAppBar toggleTheme={toggleTheme} />
                <Section>
                    <Container>
                        <Grid>
                            <Card>
                                <CardContainer>
                                    <div className="novidades">
                                        <div className="flex">
                                            <Image
                                                src="/images/novidades.png"
                                                alt="Minha imagem"
                                                width={185}
                                                height={148}
                                            /> 
                                            <div>
                                                <h2>Bem vindo de volta!</h2>
                                                <h2>usuario</h2>
                                            </div>
                                        </div>
                                    </div>
                                </CardContainer>
                            </Card>
                            <PermisssionGate
                    permissions={[
                    'canEdit'
                    ]}
                    user={{ permissions: ['canEdit'] }}
                >
                    <p>Gerenciando permissões em aplicações React</p>
                </PermisssionGate>
                            <Card>
                                <CardContainer>
                                    <div className="meli">
                                        <div className="flex">
                                            <Image
                                                src="/images/mllogo.png"
                                                alt="Minha imagem"
                                                width={164}
                                                height={148}
                                            /> 
                                            <div>
                                                <p>Mercado Livre  +  de 150 produtos</p> <br />
                                                <p>Acesse já nosso catálogo</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContainer>
                            </Card>
                            <Card>
                                <CardContainer>
                                    <div className="shop">
                                        <div className="flex">
                                            <Image
                                                src="/images/shopee.png"
                                                alt="Minha imagem"
                                                width={101}
                                                height={148}
                                            /> 
                                            <div>
                                                <p>Shopee  + de 200 produtos </p> <br />
                                                <p>Acesse já nosso catálogo </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContainer>
                            </Card>
                            <Card>
                                <CardContainer>
                                    <div className="grafic">
                                        <Image
                                            className="grafic"
                                            src="/images/grafic.png"
                                            alt="Minha imagem"
                                            width={445}
                                            height={217}
                                        />
                                    </div>
                                </CardContainer>
                            </Card>
                            <Card>
                                <CardContainer>
                                    <div className="newpro">
                                        <div className="flex">
                                            <Image
                                                src="/images/cartplus.png"
                                                alt="Minha imagem"
                                                width={101}
                                                height={148}
                                            /> 
                                            <div>
                                                <h2>19</h2>
                                                <p>Novos produtos</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContainer>
                            </Card>
                            <Card>
                                <CardContainer>
                                    <div className="total">
                                        <div className="flex">
                                            <Image
                                                src="/images/cart.png"
                                                alt="Minha imagem"
                                                width={101}
                                                height={148}
                                            /> 
                                            <div>
                                                <h2>600 </h2>
                                                <p>Anúncios</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContainer>
                            </Card>
                        </Grid>
                    </Container>
                </Section>
        </ThemeProvider>
        </>
    )
}