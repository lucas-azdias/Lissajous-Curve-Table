int scl = 100;
int r = scl/2;
int marg = 80;
int diff = 40;
int count = 1;
int val = 0;
int div;

int[] speed = {1, 2 ,3 ,4};
int[] coord1 = new int[4];
int[] coord2 = new int[4];

public void setup() {
  size(1000, 1000);
  background(0);
  
  div = ((width-100)/8)/2;
  
  //calculating();
}

public void draw() {
  background(0);
  //if (count < 8) {
    for (int i = 1; i < 9; i++) {
      if (round(floor(i/2))*2 == i) {
        stroke(255, 0, 255);
        strokeWeight(0.75);
        noFill();
        smooth();
        
        int cx = marg;
        int cy = ((div*i)+50*i)+diff;
        
        ellipse(cx, cy, scl, scl);
        ellipse(cy, cx, scl, scl);
        
        //coord1 = append(coord1, marg-r);
        //coord2 = append(coord2, ((div*i)+50*i)+diff);
        //register(div, i, val, diff);
        //println(div, i);
        //pointShow(div, i);
        
        if (val > 3) {val = 0;}
        
        if (count < 8) {
          register(cx, cy, i, val);
        } else {
          pointShow(i);
        }
        
        if (i == 1) {diff = 0;}
        val++;
      }
      count++;
    }
  //}
  //println(coord1, coord2);
  //pointMove(div, diff);
}

/*public void calculating() {
  for (int i = 1; i < 9; i++) {
    coord1[i-1] = cx-r;
    coord2[i-1] = cy;
  }
}*/

public void register(int cx, int cy, int i, int val) {
  println(div, i);
  
  coord1[(i-2)-val] = cx-r;
  coord2[(i-2)-val] = cy;
  
  println(coord1, coord2);  
  
  pointShow(i);
}

public void pointShow(int i) {
  strokeWeight(8);
  stroke(150, 0, 255);
  smooth();
  //point(cx-r, cy;
  //point(cy, cx-r);
  point(coord1[(i-2)-val], coord2[(i-2)-val]);
  point(coord2[(i-2)-val], coord1[(i-2)-val]);
  
  //pointMove(i);
}

/*public void pointMove(int div, int diff) {
  int x;
  int y;
  val = 0;
  while (true) {
    for (int i = 1; i < 9; i++) {
      if (round(floor(i/2))*2 == i) {
        x = coord1[(i-2)-val];
        y = coord2[(i-2)-val];
        
        strokeWeight(8);
        stroke(150, 0, 255);
        smooth();
        point(x, y);
        point(y, x);
        val++;
      }
    }
  }
}*/

public void pointMove(int i) {
  pointShow(i);
}

public void pointMoving() {}
