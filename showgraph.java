package graph;
import java.awt.Color;
import java.awt.Container;
import java.awt.FlowLayout;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Scanner; 

import javax.swing.*;
public class showgraph extends JFrame {
	graph G=new graph();
	Scanner sc=new Scanner(System.in);
	JButton create=new JButton("创建图");
	JButton show=new JButton("展示图");
	JButton bridge=new JButton("桥接词");
	JButton text=new JButton("补充文本");
	JButton path=new JButton("最短路径");
	JButton randompath=new JButton("随机游走");
	JButton submit=new JButton("提交");
//	ImageIcon image=new ImageIcon("C:\\Users\\11969\\Desktop\\1111\\dotGIF.gif");
//	JLabel label=new JLabel(image);
	JTextField shuchu=new JTextField("",50);
	JTextField shuru=new JTextField("",50);
	showgraph ()
	{
		Container con=this.getContentPane();
		con.setLayout(new FlowLayout(FlowLayout.LEADING,10,15));
		create.addActionListener(new ButtonListener1());
		show.addActionListener(new ButtonListener2());
		bridge.addActionListener(new ButtonListener3());
		text.addActionListener(new ButtonListener4());
		path.addActionListener(new ButtonListener5());
		randompath.addActionListener(new ButtonListener6());
		submit.addActionListener(new ButtonListener7());
		con.add(create);
		con.add(show);
		con.add(bridge);
		con.add(text);
		con.add(path);
		con.add(randompath);
//		con.add(label);
		con.add(new JLabel("输出文本框"));
		con.add(shuchu);
		con.add(new JLabel("输入文本框"));
		con.add(shuru);
		con.add(submit);
		setVisible(true);
		setSize(600,600);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	}
	public static void main(String args[])
	{
		new showgraph();
	}
	class ButtonListener1 implements ActionListener
	{
		String k;
	    public void actionPerformed (ActionEvent ae)
	    {
	    	    JFrame jf=new JFrame("创建图");
			    jf.setSize(400, 300);
			    jf.setLayout(new GridLayout(7, 1));
				jf.add(new JLabel("请输文件路径："));
				JTextField shurunew1=new JTextField("",50);
				jf.add(shurunew1);
				jf.setVisible(true);
		    	shurunew1.addActionListener(new ActionListener() {
						
						@Override
						public void actionPerformed(ActionEvent e) {
							// TODO 自动生成的方法存根
                           k=shurunew1.getText();
                           G.createDirectedGraph(k);
							
						}
					}); 
		    			   
		    
//		    	
	    }
	}
	class ButtonListener2 implements ActionListener
	{
		private boolean change=false;
	    public void actionPerformed (ActionEvent ae)
	    {
	    	
	    	if(change)
	    	{
	    		shuchu.setText("");
	    		G.showDirectedGraph(G);
	    		JFrame jf=new JFrame("有向图");
	    		ImageIcon image=new ImageIcon("C:\\Users\\11969\\Desktop\\1111\\dotGIF.gif");
	    		JLabel label=new JLabel(image);
	    		jf.add(label);
	    		jf.setVisible(true);
	    		jf.setSize(800, 600);
	    		shuchu.setText("请于文件夹中查看");
	    		change=!change;
	    	}
	    	else{
	    		change=!change;
	    	}
	    }
	}
	class ButtonListener3 implements ActionListener
	{   
		String begin,end;
		
		
	    public void actionPerformed (ActionEvent ae)
	    {
	    	JFrame jf=new JFrame("桥接词");
		    
			jf.setSize(400, 300);
			jf.setLayout(new GridLayout(7, 1));
			jf.add(new JLabel("请输入待查询的初始词与终止词"));
			jf.add(new JLabel("请输入初始词："));
			JTextField shurunew1=new JTextField("",50);
			jf.add(shurunew1);
			jf.add(new JLabel("请输入终止词："));
			JTextField shurunew2=new JTextField("",50);
			jf.add(shurunew2);
			jf.add(new JLabel("结果"));
			JTextField shuchunew=new JTextField("",50);
			jf.add(shuchunew);
			jf.setVisible(true);
	    		shurunew2.addActionListener(new ActionListener() {
					
					@Override
					public void actionPerformed(ActionEvent e) {
						// TODO 自动生成的方法存根
						begin =shurunew1.getText();
						end=shurunew2.getText();
						String word3=G.queryBridgeWords(G, begin, end);
						shuchunew.setText(word3);
					}
				}); 
	    			    	 
	    	
	    
	    }
	}
	class ButtonListener4 implements ActionListener
	{
		String text;
	    public void actionPerformed (ActionEvent ae)
	    {
            JFrame jf=new JFrame("补充文本");
			jf.setSize(400, 300);
			jf.setLayout(new GridLayout(7, 1));
			jf.add(new JLabel("请输文本："));
			JTextField shurunew1=new JTextField("",50);
			jf.add(shurunew1);
			jf.add(new JLabel("补充结果"));
			JTextField shuchunew=new JTextField("",50);
			jf.add(shuchunew);
			jf.setVisible(true);
	    		shurunew1.addActionListener(new ActionListener() {
					
					@Override
					public void actionPerformed(ActionEvent e) {
						// TODO 自动生成的方法存根
						text=shurunew1.getText();
					    String word3=G.generateNewText(G, text);
						shuchunew.setText(word3);
					}
				}); 
	    			   
	    
//	    	
	    }
	}
	class ButtonListener5 implements ActionListener
	{
		String begin,end;
		private boolean change=false;
	    public void actionPerformed (ActionEvent ae)
	    {
	    	
          JFrame jf=new JFrame("最短路径");
		    
			jf.setSize(600, 300);
			jf.setLayout(new GridLayout(7, 1));
			jf.add(new JLabel("请输入待查询的初始词与终止词"));
			jf.add(new JLabel("请输入初始词："));
			JTextField shurunew1=new JTextField("",50);
			jf.add(shurunew1);
			jf.add(new JLabel("请输入终止词："));
			JTextField shurunew2=new JTextField("",50);
			jf.add(shurunew2);
			jf.add(new JLabel("结果"));
			JTextField shuchunew=new JTextField("",50);
			jf.add(shuchunew);
			jf.setVisible(true);
	    		shurunew2.addActionListener(new ActionListener() {
					
					@Override
					public void actionPerformed(ActionEvent e) {
						// TODO 自动生成的方法存根
						begin =shurunew1.getText();
						end=shurunew2.getText();
						String word3=G.calsShortestPath(G, begin, end);						
						shuchunew.setText(word3);
					}
				}); 		  
	    }
	}
	class ButtonListener6 implements ActionListener
	{
		String text;
		int i=0;
		String[] a;
		String word3="";
	    public void actionPerformed (ActionEvent ae)
	    {
	  
	    	    JFrame jf=new JFrame("随机游走"); 
				jf.setSize(600, 300);
				jf.setLayout(new GridLayout(7, 1));
				jf.add(new JLabel("游走结果"));
				JTextField shuchunew=new JTextField("",50);
				jf.add(shuchunew);
				JButton begin=new JButton("继续游走");
				jf.add(begin);
				jf.setVisible(true);
				text=G.randomwalk(G);
				String a[]=text.split(" ");
	    		begin.addActionListener(new ActionListener() {
					
					@Override
					public void actionPerformed(ActionEvent e) {
						// TODO 自动生成的方法存根		
						if(i<a.length)
						{
							for(int j=0;j<i;j++)
							{
						       word3=word3+" "+a[j];	
							}
						    shuchunew.setText(word3);
					        i++;
					        word3="";
						}
						else {
							i=0;
						}
					}
				}); 
				
	    }
	}
	class ButtonListener7 implements ActionListener
	{
		private boolean change=false;
	    public void actionPerformed (ActionEvent ae)
	    {
	    	JButton button=(JButton)ae.getSource();
	    	if(change)
	    	{
	    		shuru.getText();
	    		change=!change;
	    	}
	    	else{
	    		button.setBackground(Color.darkGray);
	    		change=!change;
	    	}
	    }
	}
	
	
}