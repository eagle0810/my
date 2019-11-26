import React, { Component } from 'react'
import { play, lyric } from '../../common/API'
import { Button, Icon } from 'antd'
export default class Plays extends Component {
    constructor(props) {
        super(props)
        console.log(this)
        this.state = {
            url: '',
            lyric: '',
            el: '',
            lyricArr: [],
            i: '',
            time: 0
        }
        this.getLyric = this.getLyric.bind(this)
        this.getUrl = this.getUrl.bind(this)
        this.renderLyric = this.renderLyric.bind(this)
        this.interval = this.interval.bind(this)
    }
    componentDidMount() {
        this.getUrl()
        this.getLyric()
    }
    getUrl() {
        const mid = this.props.location.state.mid
        this.$http.get(play, {
            params: {
                mid
            }
        }).then(res => {
            this.setState({
                url: res.data
            })
        })
    }
    getLyric() {
        const songid = this.props.location.state.songid
        this.$http.get(lyric, {
            params: {
                songid
            }
        }).then(res => {
            this.setState({
                lyric: res.data.data.lyric
            })
            let lyric = res.data.data.lyric
            let lyricArr = lyric.split('[换行]').slice(5)
            let arr = []
            lyricArr.forEach((item, index) => {
                let lstr = item.split(']')[1]
                let ltime = item.split(']')[0].slice(1, 6)
                function ltimeFormat(ltime) {
                    let arr = ltime.split(':')
                    var m = 0
                    return arr[0] * 60 + parseInt(arr[1])
                }
                let obj = {
                    lstr,
                    ltime: ltimeFormat(ltime)
                }
                arr.push(obj)
            })
            this.setState({
                lyricArr: arr
            }, () => {
                this.renderLyric()
            })
        })
    }
    renderLyric() {
        const el = this.state.lyricArr.map((item, index) => {
            return <p key={index} className={[
                "lyric-item",
                 this.state.i == index ? "active" : ""].join(" ")}>{item.lstr}</p>

        })
        this.setState({
            el
        })
    }
    interval() {
        var t = this.state.time
        this.timer = setInterval(() => {
            this.state.lyricArr.forEach((item, index) => {
                if (t == item.ltime) {
                    this.setState({
                        i: index
                    }, () => {
                        this.renderLyric()
                        const box = this.refs.box
                        box.style.top = - index * 35 + 150 + 'px'
                    })
                }
            })
            t++
            this.setState({
                time: t
            })
        }, 1000)

    }
    play() {
        const audio = this.refs.audio
        if (audio.paused) {
            audio.play()
            this.interval()
           
        } else {
            audio.pause()
            clearInterval(this.timer)
            this.timer = null
        }
    }
    componentWillUnmount() {
        clearInterval(this.timer)
        this.timer = null
    }
    render() {
        return (
            <div className='container playbox'>
                <div className='box'>
                <div className='m' ref='box'>
                    {this.state.el}
                </div>
                </div>
               
                <div className='foot'>
                    <div className='box'>
                        <audio src={this.state.url} ref="audio"></audio>
                        <span>MV</span>
                        <span className='tow'><Icon type="pause" onClick={this.play.bind(this)} /></span>
                        <span><Icon type="heart" /></span>
                    </div>
                    <Button type="primary" shape="round" className='btn'>
                        <Icon type="caret-right" className='con' />
                    </Button>
                </div>

            </div>
        )
    }
}
