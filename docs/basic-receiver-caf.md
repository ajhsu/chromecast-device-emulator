## Example with [CastVideo-chrome](https://github.com/googlecast/CastVideos-chrome) (sender) and [BasicReceiverCAF](https://github.com/googlecast/BasicReceiverCAF) (receiver)
If you just started developing your receiver app with Google's [googlecast/CastVideos-chrome](https://github.com/googlecast/CastVideos-chrome) and [googlecast/BasicReceiverCAF](https://github.com/googlecast/BasicReceiverCAF) repositories;
Here we'll cover how to use the emulator between them.

### The sender
Since we only need the sender here to "INVOKE" and "CONTROL" our receiver app with specific [APP_ID](https://developers.google.com/cast/docs/registration);
The reason why I choose [googlecast/CastVideos-chrome](https://github.com/googlecast/CastVideos-chrome) as the sender, is simply because it's easy to build;
You may also use an iOS / Android sender app as well.

### Get your receiver app ready for recording

In order to "RECORD" messages between the sender and the receiver app,
we need to insert the `receiver-utils` into your CAF receiver app.

```html
<!-- Chromecast Device Emulator's Receiver Utilities -->
<script src="https://cdn.rawgit.com/ajhsu/chromecast-device-emulator/v1.2.6/dist/receiver-utils.min.js"></script>
<!-- CAF -->
<script type="text/javascript" src="//www.gstatic.com/cast/sdk/libs/caf_receiver/v3/cast_receiver_framework.js"></script>
```

### Deploy and publish your receiver app
Since receiver apps need to be public accessible, you still have to publish it on the internet.

Or you may use tools like [ngrok](https://ngrok.com/) to expose your local environment public accesssible.
So that your Cast devices are able to access your receiver app direct from your local machine.

### Invoke your receiver app with sender app
Once you're ready for casting, try to cast a sample video onto your receiver app.
Note that the `scenario-recorder` was started recording as soon as receiver app was invoked, any actions (play, pause, seek, next, previous .. etc) that you do, will be recorded into a scenario JSON, to be exported later.

So now you are able to make a series of actions (an user scenario, for example), and we will export the scenario later.

### Export scenario JSON file
Assume that you've done an user scenario that you want to replay it later on emulator.
Then we need to export this scenario via [remote debugging](https://developers.google.com/cast/docs/debugging):

  1. Open your Google Chrome browser
  1. Navigate to [chrome://inspect/#devices](chrome://inspect/#devices)
  1. Find the receiver app that is running in your network
  1. Open up your Chrome DevTool by click the `inspect` link
  1. Click `Console` Tab
  1. Type `CDE.exportScenario();` to export recorded scenario JSON.
  1. You'll see a huge JSON output like:
```
{"timeline":[{"time":900,"ipcMessage":"{\"data\":\"{\\\"...."}]}
```
  1. Copy and save it into a JSON file

### Start the emulator with recorded scenario JSON file

Now we got a scenario file to serve from the emulator.

You can start an emulator with CLI like:

```bash
$ chrome-device-emulator start scenario.json
```

Then you'll see the output like:

```
chromecast-device-emulator: Scenario file <your/path/to/scenario.json> has been loaded.
chromecast-device-emulator: Established a websocket server at port 8008
chromecast-device-emulator: Ready for Chromecast receiver connections..
```

Congrats!
It means the emulator is ready for receiver connections,
and you may start your receiver app development on the local machine!