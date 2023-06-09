import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background-color: ${props => props.theme.colors.background}
    font-size: 14px;
    color: ${props => props.theme.colors.text};
    font-family: sans-serif;

    .page{
      background: ${props => props.theme.colors.background}
      position: relative;
    }
    
    .content{
      border-radius: 12px;
      padding: 20px;
      max-width: 400px;
    
    
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 10%);
    }
    
    h1{
      color: ${props => props.theme.colors.text};
    }

    img{
      width: 100px
    }
  }
`;
