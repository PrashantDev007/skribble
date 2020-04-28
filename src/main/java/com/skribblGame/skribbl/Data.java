package com.skribblGame.skribbl;

import org.springframework.stereotype.Component;

@Component
public class Data<T> {

	private T x;
	private T y;
	private T isDown;
	private T lastX;
	private T lastY;
	private T mousePressed;
	
	
	
	public Data() {}
	
	



	public Data(T x, T y, T isDown, T lastX, T lastY, T mousePressed) {
		super();
		this.x = x;
		this.y = y;
		this.isDown = isDown;
		this.lastX = lastX;
		this.lastY = lastY;
		this.mousePressed = mousePressed;
	}





	public T getX() {
		return x;
	}



	public void setX(T x) {
		this.x = x;
	}



	public T getY() {
		return y;
	}



	public void setY(T y) {
		this.y = y;
	}



	public T getIsDown() {
		return isDown;
	}



	public void setIsDown(T isDown) {
		this.isDown = isDown;
	}



	public T getLastX() {
		return lastX;
	}



	public void setLastX(T lastX) {
		this.lastX = lastX;
	}



	public T getLastY() {
		return lastY;
	}



	public void setLastY(T lastY) {
		this.lastY = lastY;
	}



	public T getMousePressed() {
		return mousePressed;
	}



	public void setMousePressed(T t) {
		this.mousePressed = t;
	}



	@Override
	public String toString() {
		return "Data [x=" + x + ", y=" + y + ", isDown=" + isDown + ", lastX=" + lastX + ", lastY=" + lastY
				+ ", mousePressed=" + mousePressed + "]";
	}

	
	




	
	
	
	
}
