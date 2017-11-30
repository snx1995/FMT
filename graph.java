package graph;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Random;
import java.util.Scanner;
 
import javax.swing.*;

public class graph extends JFrame
{
public String[] node=new String[1000];
public int [][] Matrix=new int [1000][1000];
public int vertexnum;
public graph createDirectedGraph(String filename)
{
	FileReader fis=null;
	File f=new File(filename);
	if(f.exists()){
	try {
		fis=new FileReader(filename);
	    
		char[]b=new char[4096];
		int n=fis.read(b);
		String s=new String(b,0,n);
		fis.close();
		String a[]=s.split("[^a-zA-Z]+");
	    for(int i=0;i<a.length;i++)
	    {
		   a[i]=a[i].toLowerCase();
	    }
		String c[]=new String[a.length];
		int flag,num=0;
		for(int i=0;i<a.length;i++)
		{
			flag=0;
		    for(int j=0;j<c.length;j++)
		    {
		    	if(a[i].equals(c[j]))
		    	{
		    		flag=1;
		    	}
		    }
		    if(flag==0)
		    {
		    	c[num]=a[i];
		    	num++;
		    }
		}
		String node1[]=new String[num];
		for(int i=0;i<num;i++)
		{
			node1[i]=c[i];
		}
		int graph1[][]=new int[num][num];
		for(int i=0;i<a.length-1;i++)
		{
			for(int j=0;j<num;j++)
			{
				if(a[i].equals(node1[j]))
				{	
					for(int k=0;k<num;k++)
					{
						if(a[i+1].equals(node1[k]))
						{   
							graph1[j][k]++;
						}
					}
				}
			}
		}
		for(int i=0;i<node1.length;i++)
		{
			this.node[i]=node1[i];
		}
		for(int i=0;i<node1.length;i++)
		{
			for(int j=0;j<node1.length;j++)
			{
				if(graph1[i][j]==0)
				{
					this.Matrix[i][j]=100000;
				}
				else
				{
					this.Matrix[i][j]=graph1[i][j];
				}

			}
		}
        this.vertexnum=num;
       for(int i=0;i<this.vertexnum;i++)
		{
			this.Matrix[i][i]=0;
		}
       fis.close();
	}
	
	catch(IOException e){
		e.printStackTrace();
	}
	System.out.println("图已构建完成");
	}
	else
	{
		System.out.println("不存在此文件");
	}
	return this;
}
public void showDirectedGraph(graph G){
	    GraphViz gViz=new GraphViz("C:\\Users\\11969\\Desktop\\1111","D:\\dot\\bin\\dot.exe" );
	    gViz.start_graph();
	    for(int i=0;i<G.vertexnum;i++)
	    {
	    	for(int j=0;j<G.vertexnum;j++)
	    	{
	    		if(G.Matrix[i][j]<100000&&G.Matrix[i][j]!=0)
	    		{
	    			gViz.addln(G.node[i]+"->"+G.node[j]+"[label="+G.Matrix[i][j]+"]"+";");
	    		}
	    	}
	    }
	    gViz.end_graph();
	    JFrame jf=new JFrame("有向图");
		ImageIcon image=new ImageIcon("C:\\Users\\11969\\Desktop\\1111\\dotGIF.gif");
		JLabel label=new JLabel(image);
		jf.add(label);
	    try {
	        gViz.run();
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	   
}
public String queryBridgeWords(graph G,String word1,String word2)
{ 
	int w1=-1,w2=-1;
	word1=word1.toLowerCase();
	word2=word2.toLowerCase();
	String bridge[]=new String[G.vertexnum];
	String word3="";
	for(int i=0;i<G.vertexnum;i++)
	{
		if(G.node[i].equals(word1))
		{
			w1=i;
		}
		if(G.node[i].equals(word2))
		{
			w2=i;
		}
	}
	
	int count=0;
	String out[]=new String[G.vertexnum];
	if(w1==-1&&w2!=-1)
	{
		word3=word3+"No\""+word1+"\"exist in the graph";
	}
	else if(w1!=-1&&w2==-1)
	{
		word3=word3+"No\""+word2+"\" exist in the graph";
	}
	else if(w1==-1&&w2==-1)
	{
		word3=word3+"No\""+word1+"\" and \""+word2+"\"exist in the graph";
	}
	else
	{
		for(int i=0;i<G.vertexnum;i++)
		{
			if(G.Matrix[w1][i]<100000&&i!=w2&&G.Matrix[w1][i]!=0)
			{
				if(G.Matrix[i][w2]<100000)
				{
					bridge[i]=G.node[i];
				}
			}
		}
		for(int i=0;i<G.vertexnum;i++)
		{
			if(bridge[i]!=null)
			{
				out[count]=bridge[i];
			    count++;
			}
		}
		
		if(count==0)
		{
			word3=word3+"No bridge words from \""+word1+"\"to \""+word2+"\"!";
		}
		else if(count==1)
		{
			word3=word3+"The bridge words from \""+word1+"\"to \""+word2+"\"is: \""+out[0];
		}
		else 
		{
			word3=word3+"The bridge words from \""+word1+"\"to \""+word2+"\"are: \" ";
			for(int i=0;i<count-1;i++)
			{
				System.out.print(out[i]+",");
			}
			System.out.print("and "+out[count-1]);
		}
	}
	return word3;
}
public String generateNewText(graph G,String inputText)
{
	String a[]=inputText.split("[^a-zA-Z]+");
	String newtxt="";
    for(int i=0;i<a.length;i++)
    {
	   a[i]=a[i].toLowerCase();
    }
    for(int j=0;j<a.length-1;j++)
    {   
    	String word1=a[j];
    	String word2=a[j+1];
    	int w1=-1,w2=-1;
    	word1=word1.toLowerCase();
    	word2=word2.toLowerCase();
    	String bridge[]=new String[G.vertexnum];
    	for(int i=0;i<G.vertexnum;i++)
    	{
    		if(G.node[i].equals(word1))
    		{
    			w1=i;
    		}
    		if(G.node[i].equals(word2))
    		{
    			w2=i;
    		}
    	}
    	if(w1!=-1&&w2!=-1)
    	{
    	for(int i=0;i<G.vertexnum;i++)
    	{
    		if(G.Matrix[w1][i]<100000&&i!=w2&&G.Matrix[w1][i]!=0)
    		{
    			if(G.Matrix[i][w2]<100000)
    			{
    				bridge[i]=G.node[i];
    			}
    		}
    	}
    	int count=0;
    	String out[]=new String[G.vertexnum];
    	for(int i=0;i<G.vertexnum;i++)
    	{
    		if(bridge[i]!=null)
    		{
    			out[count]=bridge[i];
    		    count++;
    		}
    	}
    	newtxt=newtxt+a[j]+" ";
    	if(count!=0)
    	{
    		newtxt=newtxt+out[0]+" ";
    	}
    	}
    	else 
    	{
    		newtxt=newtxt+a[j]+" ";
    	}
    }
    newtxt=newtxt+a[a.length-1];
	return newtxt;
}
public String calsShortestPath(graph G,String word1,String word2)
{
	int d[][]=new int[G.vertexnum][G.vertexnum];
	boolean[][][] p = new boolean[G.vertexnum][G.vertexnum][G.vertexnum];
	int w1=-1,w2=-1;
	word1=word1.toLowerCase();
	word2=word2.toLowerCase();
	String word3="";
	for(int i=0;i<G.vertexnum;i++)
	{
		if(G.node[i].equals(word1))
		{
			w1=i;
		}
		if(G.node[i].equals(word2))
		{
			w2=i;
		}
	}
	for(int v=0;v<G.vertexnum;v++)
	{
	  for(int w=0;w<G.vertexnum;w++)
	  {
		  d[v][w]=G.Matrix[v][w];
		  if(d[v][w]<100000)
		  {
			  p[v][w][v]=true;
			  p[v][w][w]=true;
		  }
	  }
	}
	for(int i=0;i<G.vertexnum;i++)
	{
		d[i][i]=0;
	}
	for (int u=0;u<G.vertexnum;u++)
	{
		for(int v=0;v<G.vertexnum;v++)
		{
			for(int w=0;w<G.vertexnum;w++)
			{
				if(d[v][u]+d[u][w]<d[v][w])
				{
					d[v][w]=d[v][u]+d[u][w];
				
				for(int i=0;i<G.vertexnum;i++)
				{
					p[v][w][i]=p[v][u][i]||p[u][w][i];
				}
				}
			}
		}
	}
	if(w1==-1&&w2!=-1)
	{
		word3=word3+"No\""+word1+"\"exist in the graph";
	}
	else if(w2==-1&&w1!=-1)
	{
		word3=word3+"No\""+word2+"\" exist in the graph";
	}
	else if(w1==-1&&w2==-1)
	{
		word3=word3+"No\""+word2+" and "+"\"exist in the graph";
	}
	else if(w1==w2)
	{
		word3=word3+"Two words are same!";
	}
	else
	{
		if(d[w1][w2]<100000)
		{
			word3=word3+"The length of the path is:"+d[w1][w2];
		}
		word3=word3+"     "+"The  path is: ";
		for(int i=w1;i<G.vertexnum+w1;i++)
		{
			if(p[w1][w2][i%G.vertexnum]==true)
			{
				word3=word3+G.node[i%G.vertexnum]+"->";
			}
		}
		word3=word3+"END";
	}
     return word3;
}
public String randomwalk(graph G)
{
	Random random=new Random();
	String newtxt="";
	int rand[][]=new int[G.vertexnum][G.vertexnum];
	int out[]=new int[G.vertexnum];
	int i2,i3,count;
	String word3="";
	i2=random.nextInt(G.vertexnum);
	newtxt=newtxt+G.node[i2];
	
	while(true)
	{
		count=0;
	    for(int i=0;i<G.vertexnum;i++)
	    {
	    	if(G.Matrix[i2][i]!=0&&G.Matrix[i2][i]!=100000)
	    	{
	    		out[count]=i;
	    		count++;
	    	}
	    }
	    if(count!=0)
	    {
	    i3=out[random.nextInt(count)];
		if(rand[i2][i3]==1)
		{ 
			newtxt=newtxt+" "+G.node[i3];
			break;
		}
		newtxt=newtxt+" "+G.node[i3];
		rand[i2][i3]=1;
		i2=i3;
	    }
	    else
	    {
	    	break;
	    }	
	}
	String a[]=newtxt.split(" ");
	for(int i=0;i<a.length;i++)
	{	
		word3=word3+" "+a[i];
	}
	
	return word3;
}
public static void main(String[] args) {
	graph G=new graph();
	String mode;
   do
    {
    	System.out.println("请输入需要执行的操作代号：");
    	System.out.println("1.创建有向图");
    	System.out.println("2.展示有向图");
    	System.out.println("3.查询桥接词");
    	System.out.println("4.根据桥接词生成文本");
    	System.out.println("5.计算最短路径");
    	System.out.println("6.随机游走");
    	System.out.println("----输入\"end\"结束----");
    	Scanner sc=new Scanner(System.in);
    	mode=(String)sc.next();
    	if(mode.equals("end"))
    	{
    		break;
    	}
    	switch(mode)
    	{
    	case "1":
  
    	    String k=JOptionPane.showInputDialog("请输入文件路径");
        	G.createDirectedGraph(k);
        	break;
    	case "2":
    		G.showDirectedGraph(G);
    		System.out.println("请与文件夹中查看");
    		break;
    	case "3":
    		System.out.println("请输入待查询的初始词与终止词：");
    		System.out.println("请输入初始词：");
    		String begin=(String)sc.next();
    		System.out.println("请输入终止词：");
    		String end=(String)sc.next();
    		G.queryBridgeWords(G, begin, end);
    		System.out.println("桥接词已输出");
    		break;
    	case "4":
    		String out3=new String();
    		System.out.println("请输文本");
    		Scanner sg=new Scanner(System.in);
    		String l=new String();
    		 l=sg.nextLine();
    		
    		 out3=G.generateNewText(G, l);
    		System.out.println("根据桥接词输出的 文本为："+out3);
    		break;
    	case "5":
    		System.out.println("请输入待查询最短路径的初始词与终止词：");
    		System.out.println("请输入初始词：");
    		String begin1=(String)sc.next();
    		System.out.println("请输入终止词：");
    		String end1=(String)sc.next();
    		G.calsShortestPath(G,begin1, end1);
    		break;
    	case "6":
    		System.out.println("开始随机游走：");
    		G.randomwalk(G);
    		System.out.println("随机游走结束！");
    		break;
    	default:
    		break;
    	}
    	
    }while(true);
    }
}
