import React, { Component } from 'react'
import { styles } from "../config/styles"
import {
  Container, Header, Left, Body, Right, Title, Icon,
  Content, Footer, FooterTab, Button, Text, Card,
  CardItem, Thumbnail, Spinner
} from 'native-base'
import { cleanTag, convertToRupiah } from '../config/helper'
import * as Progress from 'react-native-progress'
import { baseUrl, color } from "../config/variable"

export default class CampaignDetailText extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const campaign = this.props.data.campaign
    const percent = (campaign.total / (campaign.goal ? campaign.goal : 1))
    return (
      <Content>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: baseUrl + "public/avatar/default.jpg" }} />
              <Body>
                <Text>{campaign.title}</Text>
                <Text note>{campaign.date}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
                Deadline: {campaign.deadline}
              </Text>
              <Text style={styles.textInfo}>Dana Terkumpul: {convertToRupiah(campaign.total)}/{convertToRupiah(campaign.goal)}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
                {(percent * 100).toFixed(2)} % Dana Terkumpul
              </Text>
              <Progress.Bar progress={percent} width={300} height={10} color={color.lightColor} />
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Body>
              <Text>{cleanTag(campaign.description)}</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    )
  }
}