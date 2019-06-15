import React from 'react';
import './App.css';
import { Animated } from "react-animated-css";

import { Statistic, Segment, Header, Label } from 'semantic-ui-react';

import Moment from 'react-moment';
import 'moment-timezone';

const atendidos = (arr) => {
  arr = arr.slice(0, 6);
  return arr.map(atendimento => (
    <Statistic color={atendimento.tipo === 0 ? "green" : "blue"} inverted>
      <Statistic.Value>{atendimento.tipo === 0 ? "NR" : "PR"}{atendimento.posicao}</Statistic.Value>
      <Statistic.Label>MESA:{atendimento.mesa}</Statistic.Label>
    </Statistic>
  ));
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { atendimento: { posicao: "10", mesa: 2, tipo: 0 }, anteriores: [], animation: true };
  }


  componentDidMount() {

    this.interval = setInterval(() => {
      this.setState((state) => ({
        atendimento: {
          posicao: Math.floor((Math.random() * 1000) + 1),
          mesa: Math.floor((Math.random() * 4) + 1),
          tipo: Math.round(Math.random())
        },
        anteriores: [state.atendimento, ...state.anteriores],
        animation: !state.animation
      }))
    }, 5000)
  }

  componentWillUnmount() {
    this.stop();
  }

  stop() {
    clearInterval(this.interval);
  }

  render() {

    const { atendimento, anteriores, animation } = this.state;

    console.log(anteriores);

    return (

      <div className="painel">
        <div className="painel-item painel-shadow">
          <Segment inverted >
            <Label size="massive" color='green' ribbon>
              Próximo Atendimento
           </Label>



            <div className="center">
              <Animated animationIn="shake" animationOut="headShake" isVisible={animation}>
                <Segment placeholder inverted style={{ fontSize: '5rem' }} textAlign="center">
                  <Header color={atendimento.tipo === 0 ? "green" : "blue"}>{atendimento.tipo === 0 ? "NR" : "PR"}{atendimento.posicao}
                    <Header.Subheader style={{ fontSize: '3.5rem', color: "red" }}>MESA: {atendimento.mesa} </Header.Subheader>
                  </Header>
                </Segment>
              </Animated>
            </div>

          </Segment>
        </div>
        <div className="painel-item painel-shadow">
          <div className="center">
            <Segment inverted padded style={{ fontSize: '6rem' }} textAlign="center">
              <Header >
                <Moment interval={1000} format="HH:mm:ss"></Moment>
                <Header.Subheader style={{ fontSize: '3rem', color: "white" }}><Moment format="DD/MM/YYYY"></Moment>
                </Header.Subheader>
              </Header>
            </Segment>
          </div>
        </div>

        <div className="painel-item size-2 painel-shadow">
          <Segment inverted>
            <Label size="massive" color='red' ribbon>
              Ultimos Chamados
        </Label>
            <div className="center">
              <Statistic.Group textAlign="left" inverted>
                {atendidos(anteriores)}
              </Statistic.Group>
            </div>
          </Segment>
        </div>
      </div >
    )
  }
};

export default App;
