CREATE DATABASE EsamenNeoNet
USE [ExamenNeoNet]
GO
/****** Object:  Table [dbo].[EX_CLIENTE]    Script Date: 8/14/2026 1:04:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EX_CLIENTE](
	[CLIId] [int] IDENTITY(1,1) NOT NULL,
	[CLINombre] [varchar](100) NOT NULL,
	[CLIEmail] [varchar](100) NOT NULL,
	[CLIEstado] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[CLIId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EX_DETALLE_VENTA]    Script Date: 8/14/2026 1:04:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EX_DETALLE_VENTA](
	[DVNId] [int] IDENTITY(1,1) NOT NULL,
	[DVNVENId] [int] NULL,
	[DVNPROId] [int] NULL,
	[DVNCantidad] [int] NULL,
	[DVNPrecioUnitario] [decimal](12, 4) NULL,
	[DVNEstado] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[DVNId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EX_PRODUCTO]    Script Date: 8/14/2026 1:04:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EX_PRODUCTO](
	[PROId] [int] IDENTITY(1,1) NOT NULL,
	[PRONombre] [varchar](100) NOT NULL,
	[PROPrecio] [decimal](12, 4) NOT NULL,
	[PROStock] [int] NOT NULL,
	[PROEstado] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[PROId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EX_USUARIO]    Script Date: 8/14/2026 1:04:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EX_USUARIO](
	[USRId] [int] IDENTITY(1,1) NOT NULL,
	[USRNombre] [varchar](30) NOT NULL,
	[USRFechaCreacion] [datetime] NOT NULL,
	[USREstado] [bit] NOT NULL,
	[USRPassword] [varchar](30) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[USRId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EX_VENTA]    Script Date: 8/14/2026 1:04:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EX_VENTA](
	[VENId] [int] IDENTITY(1,1) NOT NULL,
	[VENFecha] [datetime] NOT NULL,
	[VENCLIId] [int] NULL,
	[VENEstado] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[VENId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[EX_CLIENTE] ON 
GO
INSERT [dbo].[EX_CLIENTE] ([CLIId], [CLINombre], [CLIEmail], [CLIEstado]) VALUES (1, N'Javier Galicia', N'Javier@gmail.com', 1)
GO
INSERT [dbo].[EX_CLIENTE] ([CLIId], [CLINombre], [CLIEmail], [CLIEstado]) VALUES (2, N'Mario Carvajal', N'Mario@gmail.com', 1)
GO
INSERT [dbo].[EX_CLIENTE] ([CLIId], [CLINombre], [CLIEmail], [CLIEstado]) VALUES (3, N'Hector García', N'Hector@gmail.com', 1)
GO
INSERT [dbo].[EX_CLIENTE] ([CLIId], [CLINombre], [CLIEmail], [CLIEstado]) VALUES (4, N'Carlos Hernández', N'carlos.hernandez@gmail.com', 1)
GO
INSERT [dbo].[EX_CLIENTE] ([CLIId], [CLINombre], [CLIEmail], [CLIEstado]) VALUES (5, N'Cliente Prueba Frontend', N'prueba.frontend@example.com', 1)
GO
INSERT [dbo].[EX_CLIENTE] ([CLIId], [CLINombre], [CLIEmail], [CLIEstado]) VALUES (6, N'Heather Andrea', N'handrea@gmail.com', 1)
GO
SET IDENTITY_INSERT [dbo].[EX_CLIENTE] OFF
GO
SET IDENTITY_INSERT [dbo].[EX_DETALLE_VENTA] ON 
GO
INSERT [dbo].[EX_DETALLE_VENTA] ([DVNId], [DVNVENId], [DVNPROId], [DVNCantidad], [DVNPrecioUnitario], [DVNEstado]) VALUES (4, 5, 3, 3, CAST(400.0000 AS Decimal(12, 4)), 1)
GO
INSERT [dbo].[EX_DETALLE_VENTA] ([DVNId], [DVNVENId], [DVNPROId], [DVNCantidad], [DVNPrecioUnitario], [DVNEstado]) VALUES (5, 2, 2, 2, CAST(400.0000 AS Decimal(12, 4)), 1)
GO
INSERT [dbo].[EX_DETALLE_VENTA] ([DVNId], [DVNVENId], [DVNPROId], [DVNCantidad], [DVNPrecioUnitario], [DVNEstado]) VALUES (6, 3, 3, 1, CAST(600.0000 AS Decimal(12, 4)), 1)
GO
INSERT [dbo].[EX_DETALLE_VENTA] ([DVNId], [DVNVENId], [DVNPROId], [DVNCantidad], [DVNPrecioUnitario], [DVNEstado]) VALUES (7, 4, 4, 4, CAST(700.0000 AS Decimal(12, 4)), 1)
GO
INSERT [dbo].[EX_DETALLE_VENTA] ([DVNId], [DVNVENId], [DVNPROId], [DVNCantidad], [DVNPrecioUnitario], [DVNEstado]) VALUES (8, 2, 1, 1, CAST(500.0000 AS Decimal(12, 4)), 1)
GO
INSERT [dbo].[EX_DETALLE_VENTA] ([DVNId], [DVNVENId], [DVNPROId], [DVNCantidad], [DVNPrecioUnitario], [DVNEstado]) VALUES (9, 4, 2, 1, CAST(400.0000 AS Decimal(12, 4)), 1)
GO
INSERT [dbo].[EX_DETALLE_VENTA] ([DVNId], [DVNVENId], [DVNPROId], [DVNCantidad], [DVNPrecioUnitario], [DVNEstado]) VALUES (10, 6, 1, 1, CAST(500.0000 AS Decimal(12, 4)), 1)
GO
INSERT [dbo].[EX_DETALLE_VENTA] ([DVNId], [DVNVENId], [DVNPROId], [DVNCantidad], [DVNPrecioUnitario], [DVNEstado]) VALUES (11, 7, 1, 1, CAST(500.0000 AS Decimal(12, 4)), 1)
GO
INSERT [dbo].[EX_DETALLE_VENTA] ([DVNId], [DVNVENId], [DVNPROId], [DVNCantidad], [DVNPrecioUnitario], [DVNEstado]) VALUES (12, 8, 1, 1, CAST(500.0000 AS Decimal(12, 4)), 1)
GO
INSERT [dbo].[EX_DETALLE_VENTA] ([DVNId], [DVNVENId], [DVNPROId], [DVNCantidad], [DVNPrecioUnitario], [DVNEstado]) VALUES (13, 9, 1, 1, CAST(500.0000 AS Decimal(12, 4)), 1)
GO
INSERT [dbo].[EX_DETALLE_VENTA] ([DVNId], [DVNVENId], [DVNPROId], [DVNCantidad], [DVNPrecioUnitario], [DVNEstado]) VALUES (14, 10, 1, 1, CAST(500.0000 AS Decimal(12, 4)), 1)
GO
INSERT [dbo].[EX_DETALLE_VENTA] ([DVNId], [DVNVENId], [DVNPROId], [DVNCantidad], [DVNPrecioUnitario], [DVNEstado]) VALUES (15, 11, 2, 1, CAST(400.0000 AS Decimal(12, 4)), 1)
GO
INSERT [dbo].[EX_DETALLE_VENTA] ([DVNId], [DVNVENId], [DVNPROId], [DVNCantidad], [DVNPrecioUnitario], [DVNEstado]) VALUES (16, 12, 4, 1, CAST(600.0000 AS Decimal(12, 4)), 1)
GO
INSERT [dbo].[EX_DETALLE_VENTA] ([DVNId], [DVNVENId], [DVNPROId], [DVNCantidad], [DVNPrecioUnitario], [DVNEstado]) VALUES (17, 13, 3, 1, CAST(700.0000 AS Decimal(12, 4)), 1)
GO
INSERT [dbo].[EX_DETALLE_VENTA] ([DVNId], [DVNVENId], [DVNPROId], [DVNCantidad], [DVNPrecioUnitario], [DVNEstado]) VALUES (18, 14, 3, 1, CAST(700.0000 AS Decimal(12, 4)), 1)
GO
INSERT [dbo].[EX_DETALLE_VENTA] ([DVNId], [DVNVENId], [DVNPROId], [DVNCantidad], [DVNPrecioUnitario], [DVNEstado]) VALUES (19, 17, 2, 1, CAST(400.0000 AS Decimal(12, 4)), 1)
GO
INSERT [dbo].[EX_DETALLE_VENTA] ([DVNId], [DVNVENId], [DVNPROId], [DVNCantidad], [DVNPrecioUnitario], [DVNEstado]) VALUES (20, 18, 3, 1, CAST(700.0000 AS Decimal(12, 4)), 1)
GO
INSERT [dbo].[EX_DETALLE_VENTA] ([DVNId], [DVNVENId], [DVNPROId], [DVNCantidad], [DVNPrecioUnitario], [DVNEstado]) VALUES (21, 19, 4, 1, CAST(600.0000 AS Decimal(12, 4)), 1)
GO
INSERT [dbo].[EX_DETALLE_VENTA] ([DVNId], [DVNVENId], [DVNPROId], [DVNCantidad], [DVNPrecioUnitario], [DVNEstado]) VALUES (22, 19, 2, 1, CAST(400.0000 AS Decimal(12, 4)), 1)
GO
INSERT [dbo].[EX_DETALLE_VENTA] ([DVNId], [DVNVENId], [DVNPROId], [DVNCantidad], [DVNPrecioUnitario], [DVNEstado]) VALUES (23, 20, 4, 1, CAST(600.0000 AS Decimal(12, 4)), 1)
GO
INSERT [dbo].[EX_DETALLE_VENTA] ([DVNId], [DVNVENId], [DVNPROId], [DVNCantidad], [DVNPrecioUnitario], [DVNEstado]) VALUES (24, 21, 2, 1, CAST(400.0000 AS Decimal(12, 4)), 1)
GO
INSERT [dbo].[EX_DETALLE_VENTA] ([DVNId], [DVNVENId], [DVNPROId], [DVNCantidad], [DVNPrecioUnitario], [DVNEstado]) VALUES (25, 22, 1, 2, CAST(500.0000 AS Decimal(12, 4)), 1)
GO
SET IDENTITY_INSERT [dbo].[EX_DETALLE_VENTA] OFF
GO
SET IDENTITY_INSERT [dbo].[EX_PRODUCTO] ON 
GO
INSERT [dbo].[EX_PRODUCTO] ([PROId], [PRONombre], [PROPrecio], [PROStock], [PROEstado]) VALUES (1, N'Elden Ring', CAST(500.0000 AS Decimal(12, 4)), 18, 1)
GO
INSERT [dbo].[EX_PRODUCTO] ([PROId], [PRONombre], [PROPrecio], [PROStock], [PROEstado]) VALUES (2, N'Sonic Frontiers', CAST(400.0000 AS Decimal(12, 4)), 20, 1)
GO
INSERT [dbo].[EX_PRODUCTO] ([PROId], [PRONombre], [PROPrecio], [PROStock], [PROEstado]) VALUES (3, N'Mario World', CAST(700.0000 AS Decimal(12, 4)), 20, 1)
GO
INSERT [dbo].[EX_PRODUCTO] ([PROId], [PRONombre], [PROPrecio], [PROStock], [PROEstado]) VALUES (4, N'Final Fantasy VII Remake', CAST(600.0000 AS Decimal(12, 4)), 20, 1)
GO
SET IDENTITY_INSERT [dbo].[EX_PRODUCTO] OFF
GO
SET IDENTITY_INSERT [dbo].[EX_USUARIO] ON 
GO
INSERT [dbo].[EX_USUARIO] ([USRId], [USRNombre], [USRFechaCreacion], [USREstado], [USRPassword]) VALUES (1, N'admin', CAST(N'2026-08-13T19:06:16.370' AS DateTime), 1, N'Admin123')
GO
INSERT [dbo].[EX_USUARIO] ([USRId], [USRNombre], [USRFechaCreacion], [USREstado], [USRPassword]) VALUES (2, N'ventas', CAST(N'2026-08-13T19:06:16.370' AS DateTime), 1, N'Ventas123')
GO
INSERT [dbo].[EX_USUARIO] ([USRId], [USRNombre], [USRFechaCreacion], [USREstado], [USRPassword]) VALUES (3, N'supervisor', CAST(N'2026-08-13T19:06:16.370' AS DateTime), 1, N'Supervisor123')
GO
SET IDENTITY_INSERT [dbo].[EX_USUARIO] OFF
GO
SET IDENTITY_INSERT [dbo].[EX_VENTA] ON 
GO
INSERT [dbo].[EX_VENTA] ([VENId], [VENFecha], [VENCLIId], [VENEstado]) VALUES (2, CAST(N'2026-01-07T21:46:53.073' AS DateTime), 2, 1)
GO
INSERT [dbo].[EX_VENTA] ([VENId], [VENFecha], [VENCLIId], [VENEstado]) VALUES (3, CAST(N'2026-01-07T21:46:53.073' AS DateTime), 1, 1)
GO
INSERT [dbo].[EX_VENTA] ([VENId], [VENFecha], [VENCLIId], [VENEstado]) VALUES (4, CAST(N'2026-01-07T21:46:53.073' AS DateTime), 2, 1)
GO
INSERT [dbo].[EX_VENTA] ([VENId], [VENFecha], [VENCLIId], [VENEstado]) VALUES (5, CAST(N'2026-01-07T21:46:53.073' AS DateTime), 3, 1)
GO
INSERT [dbo].[EX_VENTA] ([VENId], [VENFecha], [VENCLIId], [VENEstado]) VALUES (6, CAST(N'2026-01-08T20:42:12.070' AS DateTime), 1, 1)
GO
INSERT [dbo].[EX_VENTA] ([VENId], [VENFecha], [VENCLIId], [VENEstado]) VALUES (7, CAST(N'2026-01-08T20:42:25.110' AS DateTime), 1, 1)
GO
INSERT [dbo].[EX_VENTA] ([VENId], [VENFecha], [VENCLIId], [VENEstado]) VALUES (8, CAST(N'2026-01-08T20:44:06.887' AS DateTime), 1, 1)
GO
INSERT [dbo].[EX_VENTA] ([VENId], [VENFecha], [VENCLIId], [VENEstado]) VALUES (9, CAST(N'2026-01-08T20:44:20.360' AS DateTime), 1, 1)
GO
INSERT [dbo].[EX_VENTA] ([VENId], [VENFecha], [VENCLIId], [VENEstado]) VALUES (10, CAST(N'2026-01-08T20:48:13.420' AS DateTime), 1, 1)
GO
INSERT [dbo].[EX_VENTA] ([VENId], [VENFecha], [VENCLIId], [VENEstado]) VALUES (11, CAST(N'2026-01-08T21:28:25.477' AS DateTime), 1, 1)
GO
INSERT [dbo].[EX_VENTA] ([VENId], [VENFecha], [VENCLIId], [VENEstado]) VALUES (12, CAST(N'2026-01-08T21:28:35.423' AS DateTime), 1, 1)
GO
INSERT [dbo].[EX_VENTA] ([VENId], [VENFecha], [VENCLIId], [VENEstado]) VALUES (13, CAST(N'2026-01-08T21:29:00.487' AS DateTime), 1, 1)
GO
INSERT [dbo].[EX_VENTA] ([VENId], [VENFecha], [VENCLIId], [VENEstado]) VALUES (14, CAST(N'2026-01-08T21:29:09.870' AS DateTime), 1, 1)
GO
INSERT [dbo].[EX_VENTA] ([VENId], [VENFecha], [VENCLIId], [VENEstado]) VALUES (17, CAST(N'2026-08-14T00:38:37.517' AS DateTime), 2, 1)
GO
INSERT [dbo].[EX_VENTA] ([VENId], [VENFecha], [VENCLIId], [VENEstado]) VALUES (18, CAST(N'2026-08-14T00:54:34.037' AS DateTime), 3, 1)
GO
INSERT [dbo].[EX_VENTA] ([VENId], [VENFecha], [VENCLIId], [VENEstado]) VALUES (19, CAST(N'2026-08-14T00:55:26.937' AS DateTime), 1, 1)
GO
INSERT [dbo].[EX_VENTA] ([VENId], [VENFecha], [VENCLIId], [VENEstado]) VALUES (20, CAST(N'2026-08-14T00:55:35.400' AS DateTime), 3, 1)
GO
INSERT [dbo].[EX_VENTA] ([VENId], [VENFecha], [VENCLIId], [VENEstado]) VALUES (21, CAST(N'2026-08-14T00:57:25.620' AS DateTime), 3, 1)
GO
INSERT [dbo].[EX_VENTA] ([VENId], [VENFecha], [VENCLIId], [VENEstado]) VALUES (22, CAST(N'2026-08-14T00:58:33.093' AS DateTime), 6, 1)
GO
SET IDENTITY_INSERT [dbo].[EX_VENTA] OFF
GO
ALTER TABLE [dbo].[EX_CLIENTE] ADD  CONSTRAINT [DF_EX_CLIENTE_CLIEstado]  DEFAULT ((1)) FOR [CLIEstado]
GO
ALTER TABLE [dbo].[EX_DETALLE_VENTA] ADD  CONSTRAINT [DF_EX_DETALLE_VENTA_DVNEstado]  DEFAULT ((1)) FOR [DVNEstado]
GO
ALTER TABLE [dbo].[EX_PRODUCTO] ADD  CONSTRAINT [DF_EX_PRODUCTO_PROEstado]  DEFAULT ((1)) FOR [PROEstado]
GO
ALTER TABLE [dbo].[EX_USUARIO] ADD  DEFAULT (getdate()) FOR [USRFechaCreacion]
GO
ALTER TABLE [dbo].[EX_VENTA] ADD  DEFAULT (getdate()) FOR [VENFecha]
GO
ALTER TABLE [dbo].[EX_VENTA] ADD  CONSTRAINT [DF_EX_VENTA_VENEstado]  DEFAULT ((1)) FOR [VENEstado]
GO
ALTER TABLE [dbo].[EX_DETALLE_VENTA]  WITH CHECK ADD FOREIGN KEY([DVNPROId])
REFERENCES [dbo].[EX_PRODUCTO] ([PROId])
GO
ALTER TABLE [dbo].[EX_DETALLE_VENTA]  WITH CHECK ADD FOREIGN KEY([DVNVENId])
REFERENCES [dbo].[EX_VENTA] ([VENId])
GO
ALTER TABLE [dbo].[EX_VENTA]  WITH CHECK ADD FOREIGN KEY([VENCLIId])
REFERENCES [dbo].[EX_CLIENTE] ([CLIId])
GO
/****** Object:  StoredProcedure [dbo].[USP_GET_CLIENTE]    Script Date: 8/14/2026 1:04:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[USP_GET_CLIENTE]	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * FROM EX_CLIENTE
END
GO
/****** Object:  StoredProcedure [dbo].[USP_GET_DETALLE_VENTA]    Script Date: 8/14/2026 1:04:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[USP_GET_DETALLE_VENTA]	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
	@VENId INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * FROM EX_DETALLE_VENTA WITH (NOLOCK) WHERE DVNVENId = @VENId AND DVNEstado = 1
END
GO
/****** Object:  StoredProcedure [dbo].[USP_GET_EMAIL_CLIENTE_VALIDATION]    Script Date: 8/14/2026 1:04:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[USP_GET_EMAIL_CLIENTE_VALIDATION] -- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>

@CLIEmail VARCHAR(40)
,@MESSAGE VARCHAR(100) NULL OUTPUT
,@SUCCESS BIT = 0 OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	BEGIN TRY
		IF NOT EXISTS(SELECT 1 FROM EX_CLIENTE WITH (NOLOCK) WHERE CLIEmail = @CLIEmail)
			BEGIN
				SET @SUCCESS = 1
			END
		ELSE 
			BEGIN
				SET @SUCCESS = 0;
				SET @MESSAGE = 'El correo ya se encuentra registrado';
			END
	END TRY

	BEGIN CATCH
		SET @SUCCESS = 0
		SET @MESSAGE = ERROR_MESSAGE()
	END CATCH
END

GO
/****** Object:  StoredProcedure [dbo].[USP_GET_PRODUCTO]    Script Date: 8/14/2026 1:04:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[USP_GET_PRODUCTO]	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * FROM EX_PRODUCTO
END
GO
/****** Object:  StoredProcedure [dbo].[USP_GET_USER]    Script Date: 8/14/2026 1:04:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[USP_GET_USER]	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
	@USRId INT
	,@USRPassword VARCHAR(30)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * FROM EX_USUARIO WITH (NOLOCK) WHERE USRId = @USRId AND USRPassword = @USRPassword AND USREstado = 1
END
GO
/****** Object:  StoredProcedure [dbo].[USP_GET_VENTA]    Script Date: 8/14/2026 1:04:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[USP_GET_VENTA]	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
	@CLIId INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * FROM EX_VENTA WITH (NOLOCK) WHERE VENCLIId = @CLIId AND VENEstado = 1
END
GO
/****** Object:  StoredProcedure [dbo].[USP_GET_VENTA_CLIENTE_HISTORIAL]    Script Date: 8/14/2026 1:04:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[USP_GET_VENTA_CLIENTE_HISTORIAL] -- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>

@CLIENTE INT

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT 
		CLINombre
		,VENFecha
		,DVNCantidad
		,DVNPrecioUnitario
		,DVNPrecioUnitario
		,PRONombre
	FROM 
		EX_CLIENTE
		INNER JOIN EX_VENTA ON CLIId = VENCLIId
		INNER JOIN EX_DETALLE_VENTA ON VENId = DVNVENId
		INNER JOIN EX_PRODUCTO ON PROId = DVNPROId
	WHERE CLIId = @CLIENTE
    -- Insert statements for procedure here
	
END
GO
/****** Object:  StoredProcedure [dbo].[USP_PUT_STOCK_PRODUCT]    Script Date: 8/14/2026 1:04:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[USP_PUT_STOCK_PRODUCT] -- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>

@PROId INT
,@Cantidad INT
,@MESSAGE VARCHAR(100) NULL OUTPUT
,@SUCCESS INT = 0 OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	BEGIN TRY
		DECLARE @StockActual INT

		SELECT @StockActual = PROStock FROM EX_PRODUCTO WITH (NOLOCK) WHERE PROId = @PROId

		IF (@StockActual => @Cantidad)
		BEGIN
			UPDATE EX_PRODUCTO SET PROStock = PROStock - @Cantidad WHERE PROId = @PROId
			SET @SUCCESS = 1
		END

		ELSE
		BEGIN
			SET @SUCCESS = 0
			SET @MESSAGE = 'La cantidad de artículos es mayor al stock'
		END
		
	END TRY

	BEGIN CATCH
		SET @SUCCESS = 0
		SET @MESSAGE = ERROR_MESSAGE()
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[USP_SET_CLIENTE]    Script Date: 8/14/2026 1:04:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[USP_SET_CLIENTE] -- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>

@CLINombre VARCHAR(30)
,@CLIEmail VARCHAR(40)
,@MESSAGE VARCHAR(100) NULL OUTPUT
,@SUCCESS BIT = 0 OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @VENTA INT

    -- Insert statements for procedure here
	BEGIN TRY
		BEGIN
			INSERT INTO EX_CLIENTE (
				CLINombre
				,CLIEmail
			) VALUES (
				@CLINombre
				,@CLIEmail
			)
		END

		SET @SUCCESS = 1
	END TRY

	BEGIN CATCH
		SET @SUCCESS = 0
		SET @MESSAGE = ERROR_MESSAGE()
	END CATCH
END

GO
/****** Object:  StoredProcedure [dbo].[USP_SET_SALE]    Script Date: 8/14/2026 1:04:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[USP_SET_SALE] -- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>

@VENCLIId INT
,@MESSAGE VARCHAR(100) NULL OUTPUT
,@VENId INT = 0 OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	BEGIN TRY
		INSERT INTO EX_VENTA (
			VENCLIId
		) VALUES (@VENCLIId)

		SET @VENId = SCOPE_IDENTITY()
	END TRY

	BEGIN CATCH
		SET @VENCLIId = 0
		SET @MESSAGE = ERROR_MESSAGE()
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[USP_SET_SALE_DETAIL]    Script Date: 8/14/2026 1:04:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[USP_SET_SALE_DETAIL] -- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>

@DVNVENId INT
,@DVNPROId INT
,@DVNCantidad INT
,@DVNPrecioUnitario INT
,@MESSAGE VARCHAR(100) NULL OUTPUT
,@SUCCESS INT = 0 OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	BEGIN TRY
		INSERT INTO EX_DETALLE_VENTA(
			DVNVENId
			,DVNPROId
			,DVNCantidad
			,DVNPrecioUnitario
		) VALUES (
			@DVNVENId
			,@DVNPROId
			,@DVNCantidad
			,@DVNPrecioUnitario
		)

		SET @SUCCESS = 1
	END TRY

	BEGIN CATCH
		SET @SUCCESS = 0
		SET @MESSAGE = ERROR_MESSAGE()
	END CATCH
END
GO
