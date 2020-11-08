USE [ANGULAR]
GO
/****** Object:  Table [dbo].[TP_DATOS_BASICOS]    Script Date: 08/11/2020 12:20:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TP_DATOS_BASICOS](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CODIGO] [int] NULL,
	[DESCRIPCION] [nvarchar](50) NULL,
	[NOMBRE] [nvarchar](50) NULL,
	[REFERENCIA] [int] NULL,
	[UBICACION] [nvarchar](50) NULL,
	[SEDE_BODEGA] [nvarchar](50) NULL,
	[IMAGEN] [image] NULL,
 CONSTRAINT [PK_TP_DATOS_BASICOS] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[TP_DATOS_BASICOS] ON 
GO
INSERT [dbo].[TP_DATOS_BASICOS] ([ID], [CODIGO], [DESCRIPCION], [NOMBRE], [REFERENCIA], [UBICACION], [SEDE_BODEGA], [IMAGEN]) VALUES (1, 4355454, N'DESARROLLADOR', N'JUAN PEDRO', 1, N'LORICA', N'TUNJA', NULL)
GO
SET IDENTITY_INSERT [dbo].[TP_DATOS_BASICOS] OFF
GO
