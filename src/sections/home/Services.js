import React, { PureComponent } from 'react'
import { Terminal, Feather, ArrowRight } from 'react-feather'

import Article from '../../components/Article'
import { Flex, Box } from '../../components/Box'
import IconContainer from '../../components/IconContainer'
import Wrapper from '../../components/Wrapper'

import { cover } from '../../styles/mixins'

const Container = Article.extend`
  border-bottom: ${props => props.theme.dark1} solid 1px;
	position: relative;

  ${Box} {
    font-size: 0.9em;
    padding: 4em 0;
		width: fit-content;

    &:first-child {
      box-shadow: inset -1px 0 0 ${props => props.theme.dark1};
      padding-right: 2em;
    }

    &:last-child {
      padding-left: 2em;
    }

    & > div {
      text-align: center;
    }
  }

  h4 {
    color: ${props => props.theme.contrast5};
    margin: 0.35em 0 0;
  }

	p:last-child {
		margin-bottom: 0;
	}
`

export default class Services extends PureComponent {
	render() {
		return (
			<Container>
				<Wrapper>
					<Flex>
						<Box>
							<div>
								<IconContainer><Terminal /></IconContainer>
								<h4>Code</h4>
							</div>
							<p>I specialize in front-end development using <a href="//reactjs.org" target="blank">ReactJS</a> to implement performant apps for web, desktop, and mobile.</p>
							<p>I have an extensive experience building apps from scratch to deployment and maintenance.</p>
						</Box>
						<Box>
							<div>
								<IconContainer><Feather /></IconContainer>
								<h4>Design</h4>
							</div>
							<p>I create app and website prototypes using <a href="//sketchapp.com" target="blank">Sketch</a> and <a href="//invisionapp.com" target="blank">Invision</a>; crafting the tiniest details to provide a delightful user experience.</p>
							<p>We're a match if you love clean, minimal, and modern UI with subtle touches of creativity.</p>
						</Box>
					</Flex>
				</Wrapper>
			</Container>
		)
	}
}