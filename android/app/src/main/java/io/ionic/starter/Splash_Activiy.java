package io.ionic.starter;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.widget.VideoView;

public class Splash_Activiy extends AppCompatActivity {

  VideoView videoView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash_activiy);
        videoView = (VideoView) findViewById(R.id.vv_test);

        videoView.setVideoURI(Uri.parse("android.resource://" +getPackageName() + "/" + R.raw.vaps100));

        videoView.start();
      new Handler().postDelayed(new Runnable() {
        @Override
        public void run() {
          Intent intent = new Intent(Splash_Activiy.this,MainActivity.class);
          startActivity(intent);
          finish();
        }
      },5000);



    }

}
