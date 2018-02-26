import React, { Component } from 'react'
import { Image } from 'react-native'
import {
    Container, Content, Card, Icon, Footer,
    CardItem, Body, Text, Fab, View
} from 'native-base'
import { cleanTag } from '../config/helper'
import {
    wpUrl, baseUrl, color,
    TWITTER_ICON, FACEBOOK_ICON, WHATSAPP_ICON,
    GOOGLE_PLUS_ICON, EMAIL_ICON, CLIPBOARD_ICON,
    MORE_ICON, REACT_ICON
} from "../config/variable"
import Share, { ShareSheet, Button } from 'react-native-share'

export default class NewsDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            visible: false
        }
    }

    onCancel() {
        console.log("CANCEL")
        this.setState({ visible: false })
    }
    onOpen() {
        console.log("OPEN")
        this.setState({ visible: true })
    }

    render() {
        let news = this.props.navigation.state.params.campaign

        let shareOptions = {
            title: news.title.rendered,
            message: news.title.rendered,
            url: "http://www.bmh.or.id/",
            subject: "Share Link" //  for email
        }

        let shareImageBase64 = {
            title: news.title.rendered,
            message: news.title.rendered,
            url: REACT_ICON,
            subject: "Share Link" //  for email
        }

        return (
            <Container>
                <Content>
                    <View style={{ flex: 1 }}>
                        <Image source={{ uri: news.better_featured_image.source_url }} style={{ height: 200, width: "100%", flex: 1 }} />
                        <Fab
                            containerStyle={{}}
                            style={{ backgroundColor: '#5067FF', zIndex: 1 }}
                            position="bottomRight" 
                            onPress={() => {
                                Share.open(shareOptions);
                            }}>
                            <Icon name="share" />
                        </Fab>
                    </View>
                    <Card>
                        <CardItem header>
                            <Text style={{ fontWeight: 'bold' }}>{news.title.rendered}</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>
                                    {cleanTag(news.content.rendered)}
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
                <View>
                    <ShareSheet visible={this.state.visible} onCancel={this.onCancel.bind(this)}>
                        <Button iconSrc={{ uri: TWITTER_ICON }}
                            onPress={() => {
                                this.onCancel();
                                setTimeout(() => {
                                    Share.shareSingle(Object.assign(shareOptions, {
                                        "social": "twitter"
                                    }));
                                }, 300);
                            }}>Twitter</Button>
                        <Button iconSrc={{ uri: FACEBOOK_ICON }}
                            onPress={() => {
                                this.onCancel();
                                setTimeout(() => {
                                    Share.shareSingle(Object.assign(shareOptions, {
                                        "social": "facebook"
                                    }));
                                }, 300);
                            }}>Facebook</Button>
                        <Button iconSrc={{ uri: WHATSAPP_ICON }}
                            onPress={() => {
                                this.onCancel();
                                setTimeout(() => {
                                    Share.shareSingle(Object.assign(shareOptions, {
                                        "social": "whatsapp"
                                    }));
                                }, 300);
                            }}>Whatsapp</Button>
                        <Button iconSrc={{ uri: GOOGLE_PLUS_ICON }}
                            onPress={() => {
                                this.onCancel();
                                setTimeout(() => {
                                    Share.shareSingle(Object.assign(shareOptions, {
                                        "social": "googleplus"
                                    }));
                                }, 300);
                            }}>Google +</Button>
                        <Button iconSrc={{ uri: EMAIL_ICON }}
                            onPress={() => {
                                this.onCancel();
                                setTimeout(() => {
                                    Share.shareSingle(Object.assign(shareOptions, {
                                        "social": "email"
                                    }));
                                }, 300);
                            }}>Email</Button>
                        <Button
                            iconSrc={{ uri: CLIPBOARD_ICON }}
                            onPress={() => {
                                this.onCancel();
                                setTimeout(() => {
                                    if (typeof shareOptions["url"] !== undefined) {
                                        Clipboard.setString(shareOptions["url"]);
                                        if (Platform.OS === "android") {
                                            ToastAndroid.show('Link copiado al portapapeles', ToastAndroid.SHORT);
                                        } else if (Platform.OS === "ios") {
                                            AlertIOS.alert('Link copiado al portapapeles');
                                        }
                                    }
                                }, 300);
                            }}>Copy Link</Button>
                        <Button iconSrc={{ uri: MORE_ICON }}
                            onPress={() => {
                                this.onCancel();
                                setTimeout(() => {
                                    Share.open(shareOptions)
                                }, 300);
                            }}>More</Button>
                    </ShareSheet>
                </View>
            </Container>
        )
    }
}