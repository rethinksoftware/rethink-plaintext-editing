import React, { useState } from 'react';
import {
  Modal,
  Grid,
  TextField,
  Button
} from '@material-ui/core'
import TinyURL from "tinyurl"

function UrlGenerator(props) {

  const { openUrlGenerator, setOpenUrlGenerator } = props

  const [urlValue, setUrlValue] = useState("")

  const [createUrl, setCreateUrl] = useState("")

  const handleClose = () => {
    setCreateUrl("")
    setUrlValue("")
    setOpenUrlGenerator(false)
  }

  const handleClick = () => {

    TinyURL.shorten(urlValue, function(res, err) {
      if (err) {
        setCreateUrl("")
      }
      else
        setCreateUrl(res)
    });
  }

  return (
    <Modal
      open={openUrlGenerator}
      style={{height: "100vh"}}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Grid
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "white",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >

        <Grid>
          <TextField
            label='Enter search query'
            style={{ margin: "0 2rem 2rem 0" }}
            value={urlValue}
            onChange={(e) => setUrlValue(e.target.value)}
          />
          <Button onClick={handleClick} style={{padding: "1rem", backgroundColor: "lightgray", margin: "2px 0"}}>
            Shorten Url
          </Button>
        </Grid>

        {createUrl
          &&  <Grid style={{marginBottom: '1rem'}}>
                <Grid>Shortened Url</Grid>
                <a href={createUrl}>{createUrl}</a>
              </Grid>}
        <Button onClick={handleClose} style={{padding: "1rem", backgroundColor: "lightgray", margin: "2px 0"}}>
          Back to Home Page
        </Button>
      </Grid>
    </Modal>
  );
}

export default UrlGenerator;
